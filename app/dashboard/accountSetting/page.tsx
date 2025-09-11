'use client';
import React, { useEffect, useRef, useState } from 'react';
import PageTitle from '@/components/pageTitle';
import { useThemeColor } from '@/lib/themeUtil';
import {
  Text,
  Box,
  FormControl,
  FormLabel,
  Stack,
  Input,
  Avatar,
  ButtonGroup,
  Button,
  Select,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { showToast } from '@/lib/toastService';
import { auth, db, storage } from '@/config/firebase';

interface CountryProps {
  name: {
    common: string;
    official: string;
    nativeName: {
      [languageCode: string]: {
        official: string;
        common: string;
      };
    };
  };
  cca3: string;
  currencies: {
    [currencyCode: string]: {
      name: string;
      symbol: string;
    };
  };
}

interface Currency {
  code: string;
  name: string;
  symbol: string;
}

interface FirebaseError {
  code: string;
  message?: string;
}

export default function AccountSetting() {
  const { childBgColor, textColor } = useThemeColor();
  const changeColor = useColorModeValue('black', 'white');
  const [countries, setCountries] = useState<CountryProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Avatar
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Password Reset
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  // Personal Details
  const [personalDetails, setPersonalDetails] = useState({
    displayName: '',
    location: '',
    email: '',
    storeName: '',
    currency: '',
    phoneNumber: '',
    address: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [originalDetails, setOriginalDetails] = useState(personalDetails);

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPersonalDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Cancel changes - reset to original values
  const handleCancelChanges = () => {
    setPersonalDetails(originalDetails);
  };

  // Save personal details
  const handleSaveDetails = async () => {
    const user = auth.currentUser;
    if (!user) {
      showToast({
        title: 'Authentication Required',
        description: 'You must be logged in to save details',
        status: 'info',
      });
      return;
    }

    try {
      setIsSaving(true);
      const updateData = {
        ...personalDetails,
        updatedAt: new Date(),
      };

      await updateDoc(doc(db, 'users', user.uid), updateData);
      setOriginalDetails(personalDetails);

      showToast({
        title: 'Success',
        description: 'Personal details updated successfully!',
        status: 'success',
      });
    } catch {
      showToast({
        title: 'Update Failed',
        description: 'Failed to save personal details. Please try again.',
        status: 'error',
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Upload with timeout
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      showToast({
        title: 'Invalid File Type',
        description: 'Please upload a JPG, PNG, or GIF file',
        status: 'error',
      });
      return;
    }

    if (file.size > 800 * 1024) {
      showToast({
        title: 'File Too Large',
        description: 'File size must be less than 800KB',
        status: 'error',
      });
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      showToast({
        title: 'Authentication Required',
        description: 'You must be logged in to upload a profile picture',
        status: 'info',
      });
      return;
    }

    setIsUploading(true);

    try {
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Upload timeout')), 10000);
      });

      const uploadPromise = (async () => {
        const storageRef = ref(storage, `profile-pictures/${user.uid}`);
        const uploadResult = await uploadBytes(storageRef, file);
        const downloadUrl = await getDownloadURL(uploadResult.ref);

        await updateDoc(doc(db, 'users', user.uid), {
          photoURL: downloadUrl,
          updatedAt: new Date(),
        });

        return downloadUrl;
      })();

      // Race between upload and timeout
      const downloadUrl = await Promise.race([uploadPromise, timeoutPromise]);

      setAvatarUrl(downloadUrl);
      showToast({
        title: 'Success',
        description: 'Profile picture updated successfully!',
        status: 'success',
      });
    } catch (error) {
      let errorMessage = 'Failed to upload profile picture. Please try again.';

      if (error instanceof Error) {
        if (error.message === 'Upload timeout') {
          errorMessage =
            'Upload timeout. Please check your connection and try again.';
        } else if (
          error.message?.includes('network') ||
          error.message?.includes('ERR_FAILED')
        ) {
          errorMessage =
            'Network error. Please check your internet connection and try again.';
        }
      } else if (error && typeof error === 'object' && 'code' in error) {
        const firebaseError = error as FirebaseError;
        if (firebaseError.code === 'storage/unauthorized') {
          errorMessage = 'You do not have permission to upload files.';
        } else if (firebaseError.code === 'storage/canceled') {
          errorMessage = 'Upload was canceled.';
        }
      }

      showToast({
        title: 'Upload Failed',
        description: errorMessage,
        status: 'error',
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Function to reset profile picture
  const handleResetAvatar = async () => {
    const user = auth.currentUser;
    if (!user) {
      showToast({
        title: 'Authentication Required',
        description: 'You must be logged in to reset profile picture',
        status: 'info',
      });
      return;
    }

    try {
      setIsResetting(true);
      await updateDoc(doc(db, 'users', user.uid), {
        photoURL: null,
        updatedAt: new Date(),
      });

      setAvatarUrl('');
      showToast({
        title: 'Success',
        description: 'Profile picture reset successfully!',
        status: 'success',
      });
    } catch {
      showToast({
        title: 'Reset Failed',
        description: 'Failed to reset profile picture. Please try again.',
        status: 'error',
      });
    } finally {
      setIsResetting(false);
    }
  };

  // Change Password
  const handlePasswordChange = async () => {
    setPasswordError('');

    if (!currentPassword.trim()) {
      setPasswordError('Current password is required');
      return;
    }

    if (!newPassword.trim()) {
      setPasswordError('New password is required');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    try {
      setIsUpdatingPassword(true);
      const user = auth.currentUser;

      if (!user || !user.email) {
        throw new Error('User not authenticated');
      }

      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      showToast({
        title: 'Success',
        description: 'Password updated successfully!',
        status: 'success',
      });
    } catch (error) {
      let errorMessage = 'Failed to update password. Please try again.';

      if (error && typeof error === 'object' && 'code' in error) {
        const firebaseError = error as FirebaseError;
        if (firebaseError.code === 'auth/wrong-password') {
          errorMessage = 'Current password is incorrect';
        } else if (firebaseError.code === 'auth/too-many-requests') {
          errorMessage = 'Too many attempts. Please try again later.';
        }
      }

      setPasswordError(errorMessage);
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  // Effect for selecting country
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          'https://restcountries.com/v3.1/all?fields=name,cca3,currencies'
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const sortedCountries = data.sort((a: CountryProps, b: CountryProps) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sortedCountries);
      } catch {
        showToast({
          title: 'Warning',
          description: 'Failed to load countries list',
          status: 'warning',
        });
        setCountries([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const loadUserData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const userDetails = {
            displayName: userData.displayName || '',
            location: userData.location || '',
            email: userData.email || user.email || '',
            storeName: userData.storeName || '',
            currency: userData.currency || '',
            phoneNumber: userData.phoneNumber || '',
            address: userData.address || '',
          };

          setPersonalDetails(userDetails);
          setOriginalDetails(userDetails);

          if (userData.photoURL) {
            setAvatarUrl(userData.photoURL);
          }
        }
      } catch {
        showToast({
          title: 'Warning',
          description: 'Failed to load user data',
          status: 'warning',
        });
      }
    };

    loadUserData();
  }, []);

  // Select currency
  const getCurrencyOptions = (): Currency[] => {
    const currencyMap = new Map<string, Currency>();

    countries.forEach((country) => {
      if (country.currencies) {
        Object.entries(country.currencies).forEach(([code, currency]) => {
          if (!currencyMap.has(code)) {
            currencyMap.set(code, {
              code,
              name: currency.name,
              symbol: currency.symbol,
            });
          }
        });
      }
    });

    return Array.from(currencyMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  };

  // Check if there are unsaved changes
  const hasUnsavedChanges =
    JSON.stringify(personalDetails) !== JSON.stringify(originalDetails);

  return (
    <>
      <PageTitle />
      <Box bg={childBgColor} color={textColor} px={3} py={5} borderRadius='xl'>
        <Stack direction={{ base: 'column', xxl: 'row' }} gap={5} mb={5}>
          <Box border='1px' borderRadius='xl' flex='1' p={3}>
            <Text fontSize='xl' fontWeight='bold' color={changeColor}>
              Change Profile
            </Text>
            <Text>Change your profile picture from here</Text>
            <Stack direction='column' alignItems='center' gap={5} mt='5'>
              <Avatar
                size='xl'
                src={avatarUrl || undefined}
                name={personalDetails.displayName || 'User'}
              />
              <input
                type='file'
                accept='image/jpeg,image/png,image/gif'
                style={{ display: 'none' }}
                onChange={handleFileUpload}
                ref={fileInputRef}
              />
              <ButtonGroup>
                <Button
                  colorScheme='blue'
                  borderRadius='3xl'
                  isLoading={isUploading}
                  onClick={() => fileInputRef.current?.click()}
                  loadingText='Uploading...'
                  isDisabled={isResetting}
                >
                  Upload
                </Button>

                <Button
                  colorScheme='orange'
                  borderRadius='3xl'
                  onClick={handleResetAvatar}
                  isLoading={isResetting}
                  loadingText='Resetting...'
                  isDisabled={isUploading}
                >
                  Reset
                </Button>
              </ButtonGroup>
              <Text fontSize='sm' color='gray.500'>
                Allowed JPG, GIF or PNG. Max size of 800K
              </Text>
            </Stack>
          </Box>

          <Box border='1px' borderRadius='xl' flex='1' px={3} py={5}>
            <Text fontSize='xl' fontWeight='bold' color={changeColor}>
              Change Password
            </Text>
            <Text>To change your password please confirm here</Text>
            <Stack mt={3} spacing={4}>
              <FormControl>
                <FormLabel>Current Password</FormLabel>
                <Input
                  type='password'
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder='Enter current password'
                />
              </FormControl>
              <FormControl>
                <FormLabel>New Password</FormLabel>
                <Input
                  type='password'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder='Enter new password (min 6 characters)'
                />
              </FormControl>
              <FormControl isInvalid={!!passwordError}>
                <FormLabel>Confirm New Password</FormLabel>
                <Input
                  type='password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder='Confirm new password'
                />
                {passwordError && (
                  <Text color='red.500' fontSize='sm' mt={1}>
                    {passwordError}
                  </Text>
                )}
              </FormControl>
              <Button
                colorScheme='blue'
                isLoading={isUpdatingPassword}
                onClick={handlePasswordChange}
                loadingText='Updating...'
                isDisabled={
                  !currentPassword || !newPassword || !confirmPassword
                }
              >
                Update Password
              </Button>
            </Stack>
          </Box>
        </Stack>

        <Box border='1px' borderRadius='xl' px={3} py={5}>
          <Text fontSize='xl' fontWeight='bold' color={changeColor}>
            Personal Details
          </Text>
          <Text>To change your personal detail, edit and save from here</Text>
          <Stack direction={{ base: 'column', xxl: 'row' }} gap={5} mt={3}>
            <Box flex='1' display='flex' flexDirection='column' gap={3}>
              <FormControl>
                <FormLabel>Your Name</FormLabel>
                <Input
                  type='text'
                  name='displayName'
                  value={personalDetails.displayName}
                  onChange={handleInputChange}
                  placeholder='Enter your full name'
                />
              </FormControl>

              <FormControl>
                <FormLabel>Location</FormLabel>
                <Select
                  placeholder='Select a country'
                  isDisabled={isLoading}
                  name='location'
                  value={personalDetails.location}
                  onChange={handleInputChange}
                >
                  {countries.map((country) => (
                    <option key={country.cca3} value={country.cca3}>
                      {country.name.common}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type='email'
                  name='email'
                  value={personalDetails.email}
                  onChange={handleInputChange}
                  placeholder='Enter your email address'
                />
              </FormControl>
            </Box>

            <Box flex='1' display='flex' flexDirection='column' gap={3}>
              <FormControl>
                <FormLabel>Store Name</FormLabel>
                <Input
                  type='text'
                  name='storeName'
                  value={personalDetails.storeName}
                  onChange={handleInputChange}
                  placeholder='Enter your store name'
                />
              </FormControl>

              <FormControl>
                <FormLabel>Currency</FormLabel>
                <Select
                  placeholder='Select currency'
                  name='currency'
                  value={personalDetails.currency}
                  onChange={handleInputChange}
                  isDisabled={isLoading}
                >
                  {getCurrencyOptions().map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.name} ({currency.symbol}) - {currency.code}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Phone</FormLabel>
                <Input
                  type='tel'
                  name='phoneNumber'
                  value={personalDetails.phoneNumber}
                  onChange={handleInputChange}
                  placeholder='Enter your phone number'
                />
              </FormControl>
            </Box>
          </Stack>
          <FormControl my={3}>
            <FormLabel>Address</FormLabel>
            <Input
              type='text'
              name='address'
              value={personalDetails.address}
              onChange={handleInputChange}
              placeholder='Enter your full address'
            />
          </FormControl>
          <Stack mt={3}>
            <ButtonGroup float='right'>
              <Button
                colorScheme='blue'
                borderRadius='3xl'
                isLoading={isSaving}
                onClick={handleSaveDetails}
                loadingText='Saving...'
                isDisabled={!hasUnsavedChanges}
              >
                Save Changes
              </Button>
              <Button
                colorScheme='orange'
                borderRadius='3xl'
                onClick={handleCancelChanges}
                isDisabled={!hasUnsavedChanges}
              >
                Cancel
              </Button>
            </ButtonGroup>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
