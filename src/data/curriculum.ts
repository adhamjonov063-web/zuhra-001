import { CourseLevel } from '../types';

export const CURRICULUM: CourseLevel[] = [
  {
    id: 'Junior',
    name: 'Junior (Starter)',
    description: 'Boshlang\'ich bosqich: Ingliz tilini noldan o\'rganishni boshlaganlar uchun.',
    color: 'bg-emerald-500',
    lessons: [
      {
        id: 'j-1',
        title: 'Alphabet & Basic Greetings',
        description: 'Ingliz alifbosi va ilk salomlashish iboralari.',
        type: 'video',
        videoUrl: 'https://www.youtube.com/embed/75p-N9YKqNo',
        content: `
          ### Ingliz Alifbosi
          Ingliz tilida 26 ta harf bor. Ularni to'g'ri talaffuz qilish juda muhim.
          
          ### Salomlashish
          - Hello! - Salom!
          - How are you? - Qandaysiz?
          - Good morning! - Xayrli tong!
        `,
        quiz: [
          {
            id: 'q-j-1-1',
            question: '"Xayrli tong" ingliz tilida qanday bo\'ladi?',
            options: ['Good afternoon', 'Good night', 'Good morning', 'Hello'],
            correctAnswer: 2,
            explanation: 'Xayrli tong - "Good morning" deb tarjima qilinadi.'
          },
          {
            id: 'q-j-1-2',
            question: 'Ingliz alifbosida nechta harf bor?',
            options: ['24', '25', '26', '27'],
            correctAnswer: 2,
            explanation: 'Ingliz alifbosida 26 ta harf mavjud.'
          }
        ]
      },
      {
        id: 'j-2',
        title: 'Verb "To Be"',
        description: 'Eng muhim fe\'l: To Be (bo\'lmoq).',
        type: 'grammar',
        content: `
          ### To Be (am, is, are)
          Bu fe'l predmetning holatini ifodalaydi.
          
          - I **am** a student. (Men talabaman)
          - He **is** a doctor. (U shifokor)
          - They **are** happy. (Ular xursand)
          
          **Savol formasi:**
          - Am I?
          - Is he/she/it?
          - Are you/we/they?
        `,
        quiz: [
          {
            id: 'q-j-2-1',
            question: '"She ___ a teacher" gapini to\'ldiring.',
            options: ['am', 'is', 'are', 'be'],
            correctAnswer: 1,
            explanation: 'Uchinchi shaxs birlik uchun (He/She/It) "is" ishlatiladi.'
          },
          {
            id: 'q-j-2-2',
            question: '"They ___ students" gapini to\'ldiring.',
            options: ['am', 'is', 'are', 'be'],
            correctAnswer: 2,
            explanation: 'Ko\'plik uchun (They/We/You) "are" ishlatiladi.'
          },
          {
            id: 'q-j-2-3',
            question: '"I ___ happy" gapini to\'ldiring.',
            options: ['am', 'is', 'are', 'be'],
            correctAnswer: 0,
            explanation: 'Birinchi shaxs birlik (I) uchun "am" ishlatiladi.'
          }
        ]
      },
      {
        id: 'j-3',
        title: 'Numbers & Counting',
        description: '1 dan 100 gacha sanashni o\'rganamiz.',
        type: 'vocabulary',
        content: `
          ### Numbers 1-10
          1. One, 2. Two, 3. Three, 4. Four, 5. Five, 6. Six, 7. Seven, 8. Eight, 9. Nine, 10. Ten.
        `,
        quiz: [
          {
            id: 'q-j-3-1',
            question: '"Five" soni qaysi?',
            options: ['3', '5', '7', '10'],
            correctAnswer: 1,
            explanation: 'Five - 5 sonini anglatadi.'
          }
        ]
      }
    ]
  },
  {
    id: 'Middle',
    name: 'Middle (Intermediate)',
    description: 'O\'rta bosqich: Kundalik muloqot va asosiy grammatikani biladiganlar uchun.',
    color: 'bg-blue-500',
    lessons: [
      {
        id: 'm-1',
        title: 'Present Perfect vs Past Simple',
        description: 'Natija va Vaqt o\'rtasidagi farq.',
        type: 'grammar',
        content: `
          ### Present Perfect vs Past Simple
          - **Past Simple:** Aniq o'tgan vaqtda sodir bo'lgan ish harakat. (I finished work at 5 PM)
          - **Present Perfect:** Natijasi hozirgi zamon bilan bog'liq ish harakat. (I have finished my work)
        `,
        quiz: [
          {
            id: 'q-m-1-1',
            question: 'Aniq vaqt ko\'rsatilganda qaysi zamon ishlatiladi?',
            options: ['Present Perfect', 'Past Simple', 'Future Simple', 'Present Continuous'],
            correctAnswer: 1,
            explanation: 'Aniq vaqt (masalan, "yesterday", "in 1990") Past Simple bilan ishlatiladi.'
          },
          {
            id: 'q-m-1-2',
            question: '"I ____ my keys. I can\'t open the door." gapini to\'ldiring.',
            options: ['lost', 'have lost', 'lose', 'was losing'],
            correctAnswer: 1,
            explanation: 'Hozirgi natija muhim bo\'lgani uchun Present Perfect ishlatiladi.'
          }
        ]
      },
      {
        id: 'm-2',
        title: 'Passive Voice',
        description: 'Majhul nisbatning qo\'llanilishi.',
        type: 'grammar',
        content: `
          ### Passive Voice
          Forma: to be + V3
          - Active: Leonardo da Vinci painted the Mona Lisa.
          - Passive: The Mona Lisa was painted by Leonardo da Vinci.
        `,
        quiz: [
          {
            id: 'q-m-2-1',
            question: '"The book ___ by my brother" gapini to\'ldiring.',
            options: ['wrote', 'is writing', 'was written', 'was write'],
            correctAnswer: 2,
            explanation: 'Majhul nisbatda "was/is/are" + o\'tgan zamon sifatdoshi (V3) ishlatiladi.'
          }
        ]
      }
    ]
  },
  {
    id: 'Senior',
    name: 'Senior (Advanced)',
    description: 'Yuqori bosqich: Murakkab mavzular va senyorlar uchun maxsus bo\'lim.',
    color: 'bg-purple-600',
    lessons: [
      {
        id: 's-1',
        title: 'Conditional Sentences',
        description: 'Shart gaplarning barcha turlari.',
        type: 'grammar',
        content: `
          ### Mixed Conditionals
          Senyorlar darajasida biz mixed conditionals ni o'rganamiz.
          - If I had studied harder (Past), I would be successful now (Present).
        `,
        quiz: [
          {
            id: 'q-s-1-1',
            question: 'Mixed conditional qachon ishlatiladi?',
            options: ['Hamma vaqt', 'Hozirgi va o\'tgan zamon shartlari aralashganda', 'Faqat kelajak uchun', 'Hech qachon'],
            correctAnswer: 1,
            explanation: 'Mixed conditionals o\'tgan zamondagi holatning hozirgi natijasini ifodalash uchun ishatiladi.'
          }
        ]
      }
    ]
  },
  {
    id: 'Master',
    name: 'Master (Expert)',
    description: 'Masterlar uchun: Akademik daraja va C1-C2 mavzulari.',
    color: 'bg-amber-600',
    lessons: [
      {
        id: 'ma-1',
        title: 'Academic Writing & Inversion',
        description: 'Akademik yozish uslubi va Inversiya.',
        type: 'vocabulary',
        content: `
          ### Inversion for Emphasis
          - Never have I seen such a beautiful sunset.
          - Seldom does he visit his hometown.
        `,
        quiz: [
          {
            id: 'q-ma-1-1',
            question: '"Never" bilan boshlangan gapda inversiya to\'g\'ri ko\'rsatilgan variantni toping.',
            options: ['Never I have seen', 'Never have I seen', 'Never I had seen', 'Never saw I'],
            correctAnswer: 1,
            explanation: 'Inversiyada yordamchi fe\'l egadan oldinga o\'tadi.'
          }
        ]
      }
    ]
  }
];
