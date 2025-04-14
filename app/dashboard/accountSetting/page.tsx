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

export default function AccountSetting() {
  const { childBgColor, textColor } = useThemeColor();
  const changeColor = useColorModeValue('black', 'white');
  const [countries, setCountries] = useState<CountryProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  //Avatar
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  //Password Reset
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  //Personal Details
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

  // Save personal details
  const handleSaveDetails = async () => {
    const user = auth.currentUser;
    if (!user) {
      showToast({
        title: 'info',
        description: 'You must be logged in to save details',
        status: 'info',
      });
      return;
    }

    try {
      setIsSaving(true);
      await updateDoc(doc(db, 'users', user.uid), {
        ...personalDetails,
        updatedAt: new Date(),
      });
      showToast({
        title: 'Update',
        description: 'Personal details updated successfully!',
        status: 'success',
      });
    } catch (error) {
      console.error('Error saving details:', error);

      showToast({
        title: 'Update failed',
        description: 'Failed to save personal details',
        status: 'error',
      });
    } finally {
      setIsSaving(false);
    }
  };

  //Upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const user = auth.currentUser;
    if (!user) {
      showToast({
        title: 'Update failed',
        description: 'You must be logged in to upload a profile picture',
        status: 'info',
      });

      return;
    }

    try {
      setIsUploading(true);

      // Upload file to Firebase Storage
      const fileRef = ref(storage, `profile-pictures/${user.uid}`);
      await uploadBytes(fileRef, file);

      // Get the download URL
      const downloadUrl = await getDownloadURL(fileRef);

      // Update user profile
      await updateDoc(doc(db, 'users', user.uid), {
        photoURL: downloadUrl,
      });

      // Update UI
      setAvatarUrl(downloadUrl);
      showToast({
        title: 'Picture update',
        description: 'Profile picture updated successfully!',
        status: 'success',
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      showToast({
        title: 'Update failed',
        description: 'Failed to upload profile picture',
        status: 'error',
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Function to reset profile picture
  const handleResetAvatar = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      setIsUploading(true);
      // Update user document with default avatar URL
      await updateDoc(doc(db, 'users', user.uid), {
        photoURL: null,
      });

      setAvatarUrl('');
      showToast({
        title: 'Reset update',
        description: 'Profile picture reset successfully!',
        status: 'success',
      });
    } catch (error) {
      console.error('Error resetting profile picture:', error);
      showToast({
        title: 'Failed',
        description: 'Failed to reset profile picture',
        status: 'error',
      });
    } finally {
      setIsUploading(false);
    }
  };

  //Change Password
  const handlePasswordChange = async () => {
    // Basic validation
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return;
    }
    setPasswordError('');

    try {
      setIsUpdatingPassword(true);
      const user = auth.currentUser;

      if (!user || !user.email) {
        throw new Error('User not found');
      }

      // Re-authenticate user before changing password
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );

      await reauthenticateWithCredential(user, credential);

      // Change password
      await updatePassword(user, newPassword);

      // Clear form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      showToast({
        title: 'password update',
        description: 'Password updated successfully!',
        status: 'success',
      });
    } catch (error) {
      console.error('Error updating password:', error);
      setPasswordError(
        'Failed to update password. Please check your current password.'
      );
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  //Effect for selecting country
  useEffect(() => {
    setIsLoading(true);
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sortedCountries = data.sort((a: any, b: any) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sortedCountries);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch countries:', error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const loadUserData = async () => {
      const user = auth.currentUser;

      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setPersonalDetails({
              displayName: userData.displayName || '',
              location: userData.location || '',
              email: userData.email || user.email || '',
              storeName: userData.storeName || '',
              currency: userData.currency || '',
              phoneNumber: userData.phoneNumber || '',
              address: userData.address || '',
            });
            if (userDoc.exists() && userData.photoURL) {
              setAvatarUrl(userData.photoURL);
            }
          }
        } catch (error) {
          console.error('Error loading user data:', error);
        }
      }
    };

    loadUserData();
  }, []);

  //Select currency
  const getCurrencyOptions = () => {
    const currencyMap = new Map();

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

    // Convert map to array and sort by currency name
    return Array.from(currencyMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  };

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
                name={personalDetails.displayName}
              />
              <input
                type='file'
                accept='image/*'
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
                >
                  Upload
                </Button>
                <Button
                  colorScheme='orange'
                  borderRadius='3xl'
                  onClick={handleResetAvatar}
                >
                  Reset
                </Button>
              </ButtonGroup>
              <Text>Allowed JPG, GIF or PNG. Max size of 800K</Text>
            </Stack>
          </Box>
          <Box border='1px' borderRadius='xl' flex='1' px={3} py={5}>
            <Text fontSize='xl' fontWeight='bold' color={changeColor}>
              Change Password
            </Text>
            <Text>To change your password please confirm here</Text>
            <Stack mt={3}>
              <FormControl isInvalid={!!passwordError}>
                <FormLabel>Current Password</FormLabel>
                <Input
                  type='password'
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>New Password</FormLabel>
                <Input
                  type='password'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </FormControl>
              <FormControl isInvalid={!!passwordError}>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type='password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {passwordError && (
                  <Text color='red.500' fontSize='sm' mt={1}>
                    {passwordError}
                  </Text>
                )}
              </FormControl>
              <Button
                colorScheme='blue'
                mt={2}
                isLoading={isUpdatingPassword}
                onClick={handlePasswordChange}
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
          <Text>To change your personal detail , edit and save from here</Text>
          <Stack direction={{ base: 'column', xxl: 'row' }} gap={5} mt={3}>
            <Box flex='1' display='flex' flexDirection='column' gap={3}>
              <FormControl>
                <FormLabel>Your Name</FormLabel>
                <Input
                  type='text'
                  name='displayName'
                  value={personalDetails.displayName}
                  onChange={handleInputChange}
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
            />
          </FormControl>
          <Stack mt={3}>
            <ButtonGroup float='right'>
              <Button
                colorScheme='blue'
                borderRadius='3xl'
                isLoading={isSaving}
                onClick={handleSaveDetails}
              >
                Save
              </Button>
              <Button colorScheme='orange' borderRadius='3xl'>
                Cancel
              </Button>
            </ButtonGroup>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
