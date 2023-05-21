export const POSSIBLE_STEPS = [
  {
    type: 'PROVIDING_DOCUMENTS',
    name: 'Providing Documents',
    description:
      "This is the first stage of the relocation process, and it's an important step to ensure that we have accurate information about you. You will be required to fill out forms with your personal information, such as your name, date of birth, and contact information. Additionally, you will need to upload your personal documents, such as your passport, ID card, and other relevant documents. This will allow us to verify your identity and begin the process of preparing your employment and migration documents.",
  },
  {
    type: 'CONTRACT',
    name: 'Contract',
    description:
      'Once your personal information has been verified, you will need to upload signed and scanned documents regarding your employment. This includes your employment contract, which will outline the details of your job in Bulgaria, such as your job title, salary, and benefits. You will also need to provide proof of your qualifications, such as your university degree or professional certifications. This stage is crucial to finalize the details of your job in Bulgaria and ensure that you are prepared for the migration process.',
  },
  {
    type: 'MIGRATION_PROCESS',
    name: 'Migration Process',
    description:
      'In this stage, our team will be preparing your documents for migration. This includes applying for your work permit, registering your address in Bulgaria, and other necessary paperwork. If we require any additional documents or information from you, you will be able to upload them here. Our team will guide you through this process and make sure that everything is in order for your move to Bulgaria. This stage may take several weeks, depending on the complexity of your case.',
  },
  {
    type: 'VISA',
    name: 'Visa',
    description:
      "After your documents have been prepared, you will need to attend a visa interview at the Bulgarian embassy or consulate in your home country. You will need to bring all of the necessary documents, such as your passport, visa application form, and proof of your employment in Bulgaria. Once your visa has been approved, you will need to upload a scan of your visa to this portal. This will allow us to ensure that everything is in order for your travel to Bulgaria. It's important to note that the visa process can take several weeks, so it's important to plan accordingly.",
  },
  {
    type: 'FINAL',
    name: 'Final Stage',
    description:
      "Congratulations, your trip to Bulgaria is confirmed! At this stage, you will receive detailed instructions over email, including information about your flight, accommodation, and any other important details. Our team will be available to assist you throughout your journey and ensure that your relocation is a smooth and stress-free experience. When you arrive in Bulgaria, our team will meet you at the airport and assist you with any additional paperwork or logistics. We're here to help you every step of the way.",
  },
];

export const RELOCATION_DOCUMENTS = {
  INTERNATIONAL_PASSPORT: {
    name: 'International Passport',
    description: `Your international passport should be valid for at least 2 years ahead.`,
  },
  DIPLOMA: {
    name: 'Diploma for last completed education',
    description:
      'Scanned certified copies of the Diploma. The diploma should demonstrate completed Bachelor education with at least of 3 years of academic studies.',
  },
  TRANSCRIPT_GRADES: {
    name: 'Transcript of grades',
    description: `Scanned certified copies of the Transcript of Grades.`,
  },
  WORK_EXPERIENCE: {
    name: 'Work experience letter / social security.',
    description:
      'Scanned original letter from an employer or an social security document stating 1+ years of experience in the IT field. This can also be a a certified copy of labour book. Please, check with our team which document is applicable for you.',
  },
  POLICE_CLEARANCE: {
    name: 'Police clearance',
    description:
      'Scanned Police clearance issued not later that the start of the relocation process. Upon collection of all required documents, the police clearance should have a validity of at least 1.5 months left.',
  },
};

export const UPLOADED_FILE_CHECKS = {
  ALLOWED_TYPES: {
    criteria: ['image/jpeg', 'image/png', 'application/pdf'],
    errorMessage:
      'Only files with the following extensions are allowed: png, jpeg, jpg, pdf',
  },
  MIN_SIZE: {
    criteria: 0, // empty file
    errorMessage: 'The file should not be empty!',
  },
  MAX_SIZE: {
    criteria: 25 * 1024 * 1024, // 25 MB
    errorMessage: 'The file exceeds the maximum file size of 25MB',
  },
  FILE_NAME: {
    criteria: /^[a-z A-Z0-9_.()-]+$/,
    errorMessage: 'The file contains non-latin characters!',
  },
};
