# Dashboard Management App

A modern, feature-rich dashboard application built with Next.js, Firebase, and Chakra UI. This application provides a comprehensive management interface with real-time communication, calendar functionality, and user authentication.

## ✨ Features

- **User Authentication**: Secure sign-in and sign-up with Firebase Auth
- **Real-time Chat**: Built-in messaging system powered by Firebase
- **Interactive Calendar**: Full calendar functionality with event management
- **Video Calling**: Integrated video communication using Agora SDK
- **Rich Text Editor**: Advanced text editing capabilities with React Quill
- **Data Visualization**: Interactive charts and graphs with Recharts
- **File Upload**: Drag-and-drop file upload functionality
- **Responsive Design**: Mobile-first design with Chakra UI and Tailwind CSS
- **Theme Support**: Light/dark mode with Next Themes
- **TypeScript**: Full type safety throughout the application

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.2.2
- **Language**: TypeScript
- **UI Library**: Chakra UI 2
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Backend & Services
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Real-time Communication**: Firebase + Agora RTC SDK

### Key Libraries
- **Calendar**: FullCalendar
- **Charts**: Recharts
- **Rich Text Editor**: React Quill
- **File Upload**: React Dropzone
- **Date Handling**: Day.js
- **Form Components**: React Select, React DatePicker

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase project with authentication and Firestore enabled
- Agora.io account for video calling features

### Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd dashboard-management-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Agora Configuration
NEXT_PUBLIC_AGORA_APP_ID=your_agora_app_id
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
dashboard-management-app/
├── components/          # Reusable UI components
├── pages/              # Next.js pages and API routes
├── lib/                # Utility functions and configurations
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── styles/             # Global styles and Tailwind config
├── public/             # Static assets
└── firebase/           # Firebase configuration and services
```

## 🔧 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks

## 🔥 Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication with your preferred sign-in methods
3. Create a Firestore database
4. Copy your Firebase configuration to the environment variables

### Required Firebase Services
- **Authentication**: For user sign-in/sign-up
- **Firestore Database**: For storing application data
- **Storage** (optional): For file uploads

## 📱 Features Overview

### Authentication System
- User registration and login
- Protected routes and authentication guards
- Profile management

### Dashboard Interface
- Clean, intuitive design
- Responsive layout for all device sizes
- Dark/light theme support

### Calendar Management
- Create, edit, and delete events
- Different calendar views (month, week, day)
- Event scheduling and reminders

### Real-time Chat
- Instant messaging between users
- Message history and persistence
- Online status indicators

### Video Communication
- One-on-one video calls
- Screen sharing capabilities
- Audio/video controls

## 🎨 Customization

The application uses Chakra UI for theming. You can customize:
- Color schemes in the theme configuration
- Component styles and variants
- Responsive breakpoints
- Animation settings with Framer Motion

## 📊 Data Visualization

Built-in charting capabilities with Recharts including:
- Line charts
- Bar charts  
- Pie charts
- Area charts
- Custom chart configurations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:
- Check the [Issues](https://github.com/your-username/dashboard-management-app/issues) page
- Create a new issue with detailed information
- Contact the development team

## 🔮 Roadmap

- [ ] Mobile app version
- [ ] Advanced analytics dashboard
- [ ] Integration with third-party services
- [ ] Advanced user roles and permissions
- [ ] API documentation
- [ ] Unit and integration tests

---

Built with ❤️ using Next.js and Firebase
