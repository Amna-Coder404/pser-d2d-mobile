# PSER D2D Mobile App

A mobile application built for **Pakistan Social & Economic Registry (PSER)** door-to-door surveys. The app allows field employees to collect household information, save incomplete surveys as drafts, continue working offline, and synchronize data with Supabase when an internet connection is available.

## 📱 Android APK

Download the latest Android APK:

[![Download APK](https://img.shields.io/badge/Download-Android%20APK-brightgreen?style=for-the-badge&logo=android)](https://expo.dev/accounts/devamna/projects/pser-d2d-mobile/builds/14cb51db-d349-4b91-80ae-5924144856a3)

## Features

* 🔐 Employee authentication
* 👤 Employee profile
* 📝 Multi-step survey form
* 💾 Save surveys as drafts
* 📱 Offline draft support
* 🔄 Automatic draft synchronization
* ☁️ Supabase backend integration
* 🖼️ Person image support
* 📋 View completed surveys
* ✏️ Resume incomplete surveys
* 🗑️ Delete drafts when online
* 🌐 Network connectivity detection
* 🎨 Clean and responsive UI
* 📊 Survey progress indicator
* 🔒 Employee-based data access

## Survey Steps

The survey is divided into three steps:

1. **Personal Information**

   * Name
   * Phone number
   * CNIC
   * Address
   * Age
   * Person image

2. **Education & Occupation**

   * Education
   * Occupation

3. **Household Information**

   * House ownership
   * Illness information
   * Marital status
   * Illness details

## Offline Draft System

The app supports working without an internet connection.

Drafts are temporarily stored in **AsyncStorage** and synchronized with **Supabase** when the device comes back online.

### Draft Flow

```text
Create Draft
     ↓
AsyncStorage
     ↓
Internet Available?
     ↓
   Yes
     ↓
Supabase Sync
     ↓
synced: true
```

Each local draft contains:

```js
{
    id: "local-123",
    remote_id: "supabase-id",
    synced: true
}
```

* `id` → Local AsyncStorage ID
* `remote_id` → Supabase draft ID
* `synced` → Indicates whether local and remote data are synchronized

## Tech Stack

### Mobile

* React Native
* Expo
* Expo Router
* JavaScript
* React Native Paper

### Backend

* Supabase
* Supabase Authentication
* PostgreSQL
* Supabase Storage

### Local Storage

* AsyncStorage
* Zustand

### Other Tools
* Expo EAS
* React Native NetInfo

## Data Synchronization

The application uses a local-cache approach for drafts.

### Online

When the employee is online:

1. Fetch drafts from Supabase.
2. Read cached drafts from AsyncStorage.
3. Match local drafts with their Supabase records.
4. Keep local-only drafts.
5. Update the local cache.
6. Display the combined draft list.

### Offline

When the employee is offline:

1. Read drafts from AsyncStorage.
2. Filter drafts belonging to the logged-in employee.
3. Display them without making Supabase requests.

## Authentication

Employees log in using their credentials and employee information is loaded from Supabase.

Only authorized employees can access their assigned survey data.




## .env

Create a `.env` file and add your Supabase project details:

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_key
```



## Purpose

The purpose of this application is to make **door-to-door survey data collection** easier for field employees by providing a structured survey workflow with offline draft support and reliable synchronization when connectivity is restored.

