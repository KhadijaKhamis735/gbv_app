export const mockSupportServices = [
  {
    id: 1,
    name: 'FIDA Tanzania',
    category: 'NGO',
    phone: '+255717905138',
    location: { address: 'Dar es Salaam', lat: -6.8, lng: 39.3 },
    description: 'Legal aid and human rights for women',
    hours: '8:00 AM - 5:00 PM',
  },
  {
    id: 2,
    name: 'Dar es Salaam Police Station',
    category: 'Police',
    phone: '+255717905138',
    location: { address: 'Dar es Salaam', lat: -6.8, lng: 39.3 },
    description: 'Main police station for reporting crimes',
    hours: '24/7',
  },
  {
    id: 3,
    name: 'Muhimbili National Hospital',
    category: 'Hospital',
    phone: '+255717905138',
    location: { address: 'Dar es Salaam', lat: -6.8, lng: 39.3 },
    description: 'Medical services and emergency care',
    hours: '24/7',
  },
  {
    id: 4,
    name: 'TAMWA',
    category: 'NGO',
    phone: '+255717905138',
    location: { address: 'Dar es Salaam', lat: -6.8, lng: 39.3 },
    description: 'Women media and advocacy organization',
    hours: '8:00 AM - 5:00 PM',
  },
  {
    id: 5,
    name: 'Zanzibar Hospital',
    category: 'Hospital',
    phone: '+255717905138',
    location: { address: 'Zanzibar', lat: -6.17, lng: 39.2 },
    description: 'Main hospital in Zanzibar',
    hours: '24/7',
  },
];

export const mockStories = [
  {
    id: 1,
    title: 'Finding My Voice',
    author: 'Anonymous',
    content:
      'After years of suffering in silence, I finally found the courage to speak out. This app helped me connect with support services that changed my life.',
    image: null,
    createdAt: new Date('2024-01-15'),
    likes: 234,
  },
  {
    id: 2,
    title: 'My Journey to Healing',
    author: 'Sarah',
    content:
      'The psychological support section helped me understand my trauma better. I am now working with a counselor and see a brighter future ahead.',
    image: null,
    createdAt: new Date('2024-01-10'),
    likes: 189,
  },
  {
    id: 3,
    title: 'Breaking Free',
    author: 'Jane',
    content:
      'I used this app to document my experiences and report to authorities. I am grateful for the resources that helped me take action.',
    image: null,
    createdAt: new Date('2024-01-05'),
    likes: 156,
  },
];

export const mockLocalLaws = {
  tanzania: {
    country: 'Tanzania',
    laws: [
      {
        id: 1,
        title: 'Law of Marriage Act, 1971',
        description: 'Provides for registration of marriages and annulment',
        content:
          'This act establishes the legal framework for marriage in Tanzania, including rights of spouses and procedures for divorce.',
      },
      {
        id: 2,
        title: 'HIV and AIDS (Prevention and Control) Act, 2008',
        description: 'Protects rights of people living with HIV/AIDS',
        content:
          'Includes provisions to prevent discrimination and sexual violence, particularly against women and vulnerable persons.',
      },
      {
        id: 3,
        title: 'Penal Code',
        description: 'Criminal legislation including provisions on sexual offences',
        content:
          'Sections 130-145 address sexual violence, although reforms are ongoing to strengthen protections.',
      },
      {
        id: 4,
        title: 'Sexual Offences Special Provisions Act, 1998',
        description: 'Addresses sexual violence and exploitation',
        content:
          'Establishes special provisions for prosecution of sexual offences and protects victims.',
      },
    ],
  },
  zanzibar: {
    country: 'Zanzibar',
    laws: [
      {
        id: 5,
        title: 'Law of Personal Status, 1961',
        description: 'Islamic law governing personal status matters',
        content:
          'Governs marriage, divorce, inheritance under Islamic law in Zanzibar.',
      },
      {
        id: 6,
        title: 'Penal Code',
        description: 'Criminal legislation with provisions on sexual crimes',
        content:
          'Contains sections addressing sexual violence and assault with specific cultural considerations.',
      },
    ],
  },
};

export const mockInternationalPolicies = [
  {
    id: 1,
    title: 'Istanbul Convention',
    organization: 'Council of Europe',
    content:
      'The Convention on preventing and combating violence against women and domestic violence is a landmark treaty against human rights violations.',
  },
  {
    id: 2,
    title: 'UN Convention on the Elimination of All Forms of Discrimination Against Women (CEDAW)',
    organization: 'United Nations',
    content:
      'An international bill of rights for women that emphasizes their freedom from sexual violence and exploitation.',
  },
  {
    id: 3,
    title: 'Beijing Declaration and Platform for Action',
    organization: 'United Nations',
    content:
      'A comprehensive framework for advancing gender equality and addressing violence against women globally.',
  },
];

export const mockHumanRights = [
  {
    id: 1,
    title: 'Right to Life',
    description: 'Everyone has the inherent right to life protected by law',
    content:
      'This fundamental right includes protection from all forms of violence and threats to personal safety.',
  },
  {
    id: 2,
    title: 'Right to Freedom from Torture and Cruel Treatment',
    description: 'No one shall be subjected to torture or cruel, inhuman treatment',
    content:
      'Sexual violence, domestic violence, and physical abuse constitute violations of this right.',
  },
  {
    id: 3,
    title: 'Right to Equality and Non-Discrimination',
    description: 'All people are equal before the law regardless of sex',
    content:
      'Gender-based discrimination that leads to violence is a violation of this fundamental right.',
  },
  {
    id: 4,
    title: 'Right to Physical Integrity',
    description: 'Every person has the right to preserve their bodily integrity',
    content:
      'Protection from sexual violence and assault is essential to protecting bodily autonomy.',
  },
];

export const mockIncidents = [
  {
    id: 1,
    title: 'Workplace Harassment',
    description: 'Experienced unwanted advances at work',
    type: 'harassment',
    date: new Date('2024-01-20'),
    time: '14:30',
    location: { lat: -6.8, lng: 39.3 },
    media: [],
    status: 'submitted',
  },
];

export const mockChatMessages = [
  {
    id: 1,
    text: "Hello! I'm here to listen and provide support. How are you feeling today?",
    sender: 'bot',
    timestamp: new Date(),
  },
];

export const mockChatResponses = [
  "I understand how you're feeling. You are not alone in this.",
  "That sounds difficult. Would you like to know about local support services?",
  "Your safety is important. Have you considered reporting this to authorities?",
  "It's okay to feel confused or scared. These are normal reactions.",
  "Would you like to talk to a professional counselor?",
  "Let me share some resources that might help you.",
];
