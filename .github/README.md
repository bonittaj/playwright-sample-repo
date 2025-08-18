# Thomann E2E Test Task

This repository contains the end-to-end (E2E) test automation for the CableGuy section of the Thomann website. The tests are implemented using Playwright.

## Task Details

The test scenario includes selecting cables, filtering by manufacturer, and validating product selection and shopping basket functionality.

### Test Steps

**Step 1: Cable Beginning Selection**  
- Click on the **"Cable Beginning"** section.  
- Select a **random Cable Type** and then a **random Cable** within that type.

**Step 2: Cable End Selection**  
- Click on the **"Cable End"** section.  
- Select another **random Cable Type** and then a **random Cable** within that type.

**Step 3: Manufacturer Selection**  
- Choose a **random Manufacturer** from the available options.  
- Validate that the **number of products displayed** matches the **expected number** indicated below the manufacturer’s logo.

**Step 4: Product Page Verification**  
- Click on one of the products filtered by the selection.  
- Verify that the **correct product page** is opened.

**Step 5: Shopping Basket Validation**  
- Add the selected product (cable) to the **shopping basket**.  
- Verify the **Basket Notification Popup** for correctness.

## Notes
- Random selections are used for Cable Type, Cable, and Manufacturer to ensure comprehensive test coverage.
- All validations should match the expected behavior as per the website’s UI and product information.

## Environment Variables
- `BASEURL`: Base URL of the Thomann CableGuy page  
  Example: `https://www.thomann.de/intl/cableguy.html`**Page Object Model (POM)** and CI/CD integration with GitHub Actions.

---

## Key Features

- **UI Test Automation** using Playwright  
- **Structured with Page Object Model (POM)**  
- **CI/CD Integration** with GitHub Actions  
- **Allure Report Integration**

---

## Implementation Approach

- **Requirement Analysis** – Understand the application's UI flow  
- **Framework** – Playwright
- **POM Implementation** – Applied Page Object Model to structure UI tests efficiently  
- **Reporting** – Integrated Allure reporting for test reports  and Playwright default report
- **CI/CD Setup** – Configured GitHub Actions to trigger tests automatically on commits and pull requests  

---

## Setup Instructions

### Prerequisites
- Ensure **Node.js** and **npm** are installed

### Installation
```bash
git clone https://github.com/bonittaj/thomann.git
cd thomann
git checkout develop
npm install
```
### Environment Setup
Update the .env file with your CLIENT_ID and CLIENT_SECRET
```bash
npm run test:allure        # Run UI tests with allure report
npm run test        # Run UI tests  with playwright report
```
### Execution through Github
Execution step throuh Github
- Click On Action 
- Click on E2E Tests
- Click on Run Workflow