-- CreateTable
CREATE TABLE `Admin` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `avatar` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `permission` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Admin_email_key`(`email`),
    INDEX `Admin_email_idx`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Application` (
    `id` VARCHAR(191) NOT NULL,
    `amount` DECIMAL(7, 2) NOT NULL,
    `period` INTEGER NOT NULL,
    `interest` DECIMAL(7, 2) NOT NULL,
    `service_fee` DECIMAL(7, 2) NOT NULL,
    `total_amount` DECIMAL(7, 2) NOT NULL,
    `application_status` ENUM('DISBURSED', 'APPROVED', 'DECLINED', 'CLOSED', 'BLOCKED', 'PENDING') NOT NULL DEFAULT 'PENDING',
    `payment_status` ENUM('PAID', 'OWEING', 'DEFAULT') NOT NULL DEFAULT 'DEFAULT',
    `approved_by` VARCHAR(191) NULL,
    `approved_on` DATETIME(3) NULL,
    `disbursed_date` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `repayment_date` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `remarks` VARCHAR(500) NULL,
    `selfie_img` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Application_userId_application_status_payment_status_idx`(`userId`, `application_status`, `payment_status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Repayment` (
    `id` VARCHAR(191) NOT NULL,
    `amount` DECIMAL(7, 2) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` VARCHAR(191) NOT NULL,
    `loanId` VARCHAR(191) NOT NULL,

    INDEX `Repayment_userId_loanId_idx`(`userId`, `loanId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `personal_phone1` VARCHAR(191) NOT NULL,
    `personal_phone2` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `otp` INTEGER NOT NULL,
    `dob` DATETIME(3) NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `ghcard_img` VARCHAR(191) NOT NULL,
    `ghcard_number` VARCHAR(191) NOT NULL,
    `marital_status` VARCHAR(191) NOT NULL,
    `education` VARCHAR(191) NOT NULL,
    `residential_address` VARCHAR(191) NOT NULL,
    `religion` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `area` VARCHAR(191) NOT NULL,
    `landmark` VARCHAR(191) NOT NULL,
    `company_name` VARCHAR(191) NOT NULL,
    `company_phone` VARCHAR(191) NOT NULL,
    `company_location` VARCHAR(191) NOT NULL,
    `company_city` VARCHAR(191) NOT NULL,
    `company_landmark` VARCHAR(191) NOT NULL,
    `monthly_income` VARCHAR(191) NOT NULL,
    `designation` VARCHAR(191) NOT NULL,
    `fm1_fullname` VARCHAR(191) NOT NULL,
    `fm1_phonenumber` VARCHAR(191) NOT NULL,
    `fmm1_relationship` VARCHAR(191) NOT NULL,
    `fmm2_fullname` VARCHAR(191) NOT NULL,
    `fmm2_phone_number` VARCHAR(191) NOT NULL,
    `fmm2_relationship` VARCHAR(191) NOT NULL,
    `co_worker_fullname` VARCHAR(191) NOT NULL,
    `co_worker_phone` VARCHAR(191) NOT NULL,
    `co_worker_relationship` VARCHAR(191) NOT NULL,
    `wallet_network` VARCHAR(191) NOT NULL,
    `wallet_name` VARCHAR(191) NOT NULL,
    `wallet_number` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    INDEX `User_personal_phone1_personal_phone2_idx`(`personal_phone1`, `personal_phone2`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
