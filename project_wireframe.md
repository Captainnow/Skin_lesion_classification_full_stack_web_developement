# Melascope DX - Project Wireframe and Workflow

## 1. Project Overview
Melascope DX is an AI-powered skin lesion analysis tool designed to assist in the early detection and classification of skin conditions. It features a modern web interface for users to upload images, receive AI predictions, and get educational advice via a chatbot.

## 2. User Workflow

### **Step 1: Landing Page (`/`)**
- **Purpose**: Introduction to the platform and entry point.
- **Actions**:
  - View hero section with value proposition.
  - "Get Started" button to enter the main app.
  - Information sections about features.

### **Step 2: Dashboard (`/app/dashboard`)**
- **Purpose**: Central hub for the user.
- **Components**:
  - **Welcome Message**: Personalized greeting.
  - **Quick Stats**: Overview of activity (Total Scans, High Risk Cases).
  - **Navigation**: Access to key features via sidebar.

### **Step 3: Assessments (`/app/assessments`)**
- **Purpose**: Core feature for analyzing skin lesions.
- **Workflow**:
  1. **Upload**: User drags & drops or selects an image of a skin lesion.
  2. **Analysis**: User clicks "Analyze".
     - Frontend sends image to Backend API.
     - AI Model processes the image.
  3. **Results**:
     - **Prediction**: Display of the most likely condition + confidence score.
     - **AI Advisory**: 
       - **Interactive Chatbot (MelaBot)**: Users can ask follow-up questions about the analysis.
       - "AI Medical Advisor" interface offering guidance based on the result.

---

## 3. High-Level Architecture & Data Flow

```mermaid
graph TD
    User[User] -->|Interact| FE[Frontend (React + Vite)]
    FE -->|HTTP API Requests| BE[Backend (Python/FastAPI)]
    
    subgraph Backend Services
        BE -->|Inference| AI[AI Model]
        BE -->|Chat Logic| LLM[LLM Service]
    end
    
    AI -->|Prediction| BE
    LLM -->|Advisory Response| BE
    BE -->|JSON Response| FE
```

## 4. Key Wireframe Layouts

### **App Layout (Wrapper)**
- **Sidebar/Navigation Rail**:
  - Logo
  - Dashboard Icon
  - Assessments Icon
  - *(Placeholders for future modules: Patients, Settings)*
- **Main Content Area**: Dynamic content based on route.
- **MelaBot Interface**: Integrated AI assistant for guidance.

### **Assessment Page**
```
+-------------------------------------------------------+
|  [ Header: Assessment ]                               |
|-------------------------------------------------------|
|                                                       |
|   +---------------------------+   +---------------+   |
|   |                           |   |               |   |
|   |   Image Upload Area       |   |  Prediction   |   |
|   |   (Drag & Drop)           |   |  Results      |   |
|   |                           |   |               |   |
|   |   [ Preview Image ]       |   |  [ Label ]    |   |
|   |                           |   |  [ Conf % ]   |   |
|   |   [ Analyze Button ]      |   |               |   |
|   |                           |   +---------------+   |
|   +---------------------------+                       |
|                                   +---------------+   |
|                                   |               |   |
|                                   |  AI Advisor   |   |
|                                   |  (Chatbot)    |   |
|                                   |               |   |
|                                   |  [ Chat ]     |   |
|                                   |               |   |
|                                   +---------------+   |
|                                                       |
+-------------------------------------------------------+
```
