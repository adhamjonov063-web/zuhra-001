import { CourseLevel, Level, Lesson, QuizQuestion } from '../types';

// Let's define the 25 topics for each of the 4 levels
const TOPICS_BY_LEVEL: Record<Level, { title: string; description: string; content: string }[]> = {
  Junior: [
    {
      title: 'Alphabet & Basic Greetings',
      description: 'Ingliz tili alifbosi va birinchi salomlashish darsi.',
      content: `### Ingliz Alifbosi\nIngliz tilida 26 ta harf bor (5 ta unli va 21 ta undosh). Ularning to'g'ri talaffuzi judayam muhim.\n\n### Salomlashish\n- Hello! / Hi! - Salom!\n- Good morning! - Xayrli tong!\n- Good afternoon! - Xayrli kun!\n- Good evening! - Xayrli kech!\n- How are you? - Qalaysiz?\n- Nice to meet you! - Tanishganimdan xursandman!`
    },
    {
      title: 'Verb "To Be" (am, is, are)',
      description: 'Eng muhim fe\'l - "bo\'lmoq" fe\'lining hozirgi zamonda tuslanishi.',
      content: `### Verb "To Be"\nPredmet yoki shaxsning holati, kasbi yoki joyini bildiradi.\n\n- **I am** a student. (Men talabaman.)\n- **He/She/It is** happy. (U xursand.)\n- **We/You/They are** from Tashkent. (Biz/Siz/Ular Toshkentdanmiz.)\n\n**Inkor shakli:** am not, is not (isn't), are not (aren't).\n**So'roq shakli:** Am/Is/Are gap boshiga o'tadi.`
    },
    {
      title: 'Numbers & Counting (1-100)',
      description: 'Ingliz tilida sonlar, sanoq tizimi va yoshni aytish.',
      content: `### Sonlar (Numbers)\n- 1-10: one, two, three, four, five, six, seven, eight, nine, ten.\n- 11-19: eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen.\n- 20, 30, 40, ...: twenty, thirty, forty, fifty, sixty, seventy, eighty, ninety, hundred.\n\n**Savol berish:** "How old are you?" (Yoshingiz nechida?) - "I am 18 years old."`
    },
    {
      title: 'Personal Pronouns (Kishilik olmoshlari)',
      description: 'Men, sen, u shaxslarini inglizcha ifodalash.',
      content: `### Kishilik Olmoshlari (Personal Pronouns)\nGapda ega vazifasida keladigan so'zlar:\n\n- **I** - Men\n- **You** - Sen / Siz\n- **He** - U (o'g'il bolaga)\n- **She** - U (qiz bolaga)\n- **It** - U (predmet va hayvonlarga)\n- **We** - Biz\n- **They** - Ular`
    },
    {
      title: 'Singular and Plural Nouns (Otlar: Birlik va Ko\'plik)',
      description: 'Otlar ko\'pligini yasash qoidalari (-s qo\'shimchasi).',
      content: `### Singular & Plural\nOtlar ko'pligini yasash uchun odatda **-s** yoki **-es** qo'shiladi:\n- a book -> books\n- a box -> boxes\n- a baby -> babies\n\n**Irregular ko'plik (mustasno):**\n- a man -> men\n- a child -> children\n- a person -> people`
    },
    {
      title: 'Articles: A, An, The',
      description: 'Noaniq va aniq artikllarning asosiy farqlari.',
      content: `### Articles\n- **A / An** - faqat birlikdagi va sanaladigan otlar oldidan ishlatiladi. Undoshdan boshlansa "a", unli tovushdan boshlansa "an": *a car, an apple*.\n- **The** - aniq bo'lgan, tinglovchiga tanish predmetlar bilan ishlatiladi: *Look at the sun!*`
    },
    {
      title: 'Basic Adjectives (Sifatlar)',
      description: 'Predmetlarni tasvirlash: ko\'rinish, hajm va xarakter.',
      content: `### Sifat (Adjective)\nPredmetning belgisini bildiradi va otlardan oldin keladi:\n- **big** (katta) - **small** (kichik)\n- **hot** (issiq) - **cold** (sovuq)\n- **beautiful** (chiroyli) - **ugly** (xunuk)`
    },
    {
      title: 'Present Simple: Affirmative (Hozirgi oddiy zamon)',
      description: 'Doimiy va takrorlanib turadigan harakatlar.',
      content: `### Present Simple (-s qoidasi)\nKundalik odatlar va umumiy haqiqatlar uchun:\n- I go to school every day.\n- He play**s** football. (Uchinchi shaxs birlikda fe'lga **-s** yoki **-es** qo'shiladi.)`
    },
    {
      title: 'Present Simple: Negative (Inkor shakli)',
      description: 'Hozirgi oddiy zamonning don\'t va doesn\'t yordamchi fe\'llari.',
      content: `### Negatives in Present Simple\nInkor shaklini yasash uchun **don't** (do not) va **doesn't** (does not) ishlatiladi:\n- I **don't** like apples.\n- She **doesn't** speak German. (doesn't kelganda fe'ldagi -s o'chadi.)`
    },
    {
      title: 'Present Simple: Questions (So\'roq shakli)',
      description: 'Present Simple\'da Do va Does bilan so\'roq gaplar tuzish.',
      content: `### Questions in Present Simple\nDo/Does egadan oldinga o'tadi:\n- **Do** you play tennis? - Yes, I do / No, I don't.\n- **Does** he write letters? - Yes, he does / No, he doesn't.`
    },
    {
      title: 'Demonstrative Pronouns (Ko\'rsatish olmoshlari)',
      description: 'Yaqin va uzoqdagi narsalarni ko\'rsatish: This, That, These, Those.',
      content: `### Demonstrative Pronouns\n- **This** - mana bu (birlikda, yaqinda)\n- **These** - mana bular (ko'plikda, yaqinda)\n- **That** - ana u (birlikda, uzoqda)\n- **Those** - ana ular (ko'plikda, uzoqda)`
    },
    {
      title: 'Possessive Adjectives (Egalik sifatlari)',
      description: 'Mening, sening, uning so\'zlarini to\'g\'ri qo\'llash.',
      content: `### Egalik Sifatlari\n- **my** - mening (my car)\n- **your** - sening / sizning\n- **his** - uning (o'g'il bolaga)\n- **her** - uning (qiz bolaga)\n- **its** - uning (predmet/hayvon)\n- **our** - bizning\n- **their** - ularning`
    },
    {
      title: 'Prepositions of Place (Joy old ko\'makchilari)',
      description: 'Narsalar qayerda joylashganligini ifodalash: In, On, Under, Behind.',
      content: `### Prepositions of Place\n- **in** - ichida (in the room)\n- **on** - ustida (on the table)\n- **under** - tagida (under the bed)\n- **behind** - orqasida\n- **in front of** - oldida\n- **next to** - yonida`
    },
    {
      title: 'Prepositions of Time (Vaqt ko\'makchilari)',
      description: 'At, On va In predloglarining vaqtlar bilan ishlatilishi.',
      content: `### Prepositions of Time\n- **at** - soat va bayramlar bilan: *at 5 o'clock, at Christmas*\n- **on** - kunlar va sanalar bilan: *on Monday, on May 25*\n- **in** - oylar, yillar va fasllar bilan: *in June, in 2026, in summer*`
    },
    {
      title: 'Present Continuous: Affirmative (Hozirgi davomiy zamon)',
      description: 'Ayni damda sodir bo\'layotgan ish-harakatlar.',
      content: `### Present Continuous (am/is/are + V-ing)\nHozir gapirib turgan vaqtda bajarilayotgan ishlar:\n- I **am playing** a computer game now.\n- Look! It **is raining**.\n- They **are listening** to the teacher.`
    },
    {
      title: 'Present Continuous: Negatives & Questions',
      description: 'Hozirgi davomiy zamonda inkor va so\'roq formalarini yasash.',
      content: `### Inkor va So'roq\n- **Inkor:** am not / isn't / aren't + V-ing -> *She isn't eating now.*\n- **So'roq:** Am/Is/Are gap boshiga chiqadi -> *Are you reading a book?*`
    },
    {
      title: 'Modal Verb: Can & Can\'t',
      description: 'Qobiliyat va imkoniyatlarni ifodalovchi yordamchi modal fe\'l.',
      content: `### Can & Can't\nQila olish qobiliyatini ifodalaydi. Shaxsga qarab o'zgarmaydi:\n- I **can** swim inside the pool.\n- He **can't** speak Chinese.\n- **Can** you play guitar?`
    },
    {
      title: 'Colors & Clothing (Ranglar va kiyimlar)',
      description: 'Kundalik kiyim-kechaklar va ranglar lug\'at boyligi.',
      content: `### Ranglar & Kiyimlar\n- **red** (qizil), **blue** (ko'k), **green** (yashil), **black** (qora), **white** (oq).\n- **shirt** (ko'ylak), **t-shirt** (futbolka), **trousers** (shim), **shoes** (poyabzal), **jacket** (kurka).`
    },
    {
      title: 'Family Members (Oila a\'zolari)',
      description: 'Oila xonadonini ifodalovchi asosiy inglizcha so\'zlar.',
      content: `### Oila a'zolari (Family)\n- **father** (ota), **mother** (ona), **parents** (ota-ona).\n- **brother** (aka/uka), **sister** (opa/singil), **brother-in-law** (pochcha).\n- **grandfather** (bobo), **grandmother** (buji/buvi).`
    },
    {
      title: 'Telling the Time (Vaquni aytish)',
      description: 'Ingliz tilida vaqt so\'rash va soat nechaligini aytish.',
      content: `### Soatni aytish\n- "What time is it?" - Soat necha?\n- **It's 5 o'clock.** (Soat roppa-rosa 5)\n- **It's half past 6.** (6 yarim)\n- **It's quarter past 4.** (4 dan 15 daqiqa o'tdi)\n- **It's quarter to 8.** (8 ga 15 daqiqa qoldi)`
    },
    {
      title: 'Past Simple: To Be (Was, Were)',
      description: 'O\'tgan zamon holatlarini ifodalash: Was va Were.',
      content: `### Past of To Be\n- I/He/She/It -> **was** -> *I was tired yesterday.*\n- We/You/They -> **were** -> *They were in London last year.*\n\n**Inkor formasi:** was not (wasn't), were not (weren't).`
    },
    {
      title: 'Past Simple: Regular Verbs (To\'g\'ri fe\'llar)',
      description: 'O\'tgan zamonda to\'g\'ri fe\'llarga -ed qo\'shish qoidalari.',
      content: `### Regular Past Simple (-ed)\nO'tgan oddiy zamonda to'g'ri fe'llarga **-ed** qo'shiladi:\n- work -> work**ed**\n- play -> play**ed**\n- live -> liv**ed**\n\n- *I worked hard last Monday.*`
    },
    {
      title: 'Past Simple: Irregular Verbs (Yolg\'on/Noto\'g\'ri fe\'llar)',
      description: 'O\'tgan zamonda o\'zgarib ketuvchi noto\'g\'ri fe\'llarni o\'rganish.',
      content: `### Irregular Verbs (2-shakl)\nNoto'g'ri fe'llar qoida bo'yicha yasalmaydi, ularni yodlash kerak:\n- go -> **went**\n- have -> **had**\n- see -> **saw**\n- buy -> **bought**\n\n- *We went to Samarkand last month.*`
    },
    {
      title: 'Future Simple (Will / Won\'t)',
      description: 'Kelajakdagi reja va va\'dalarni ifodalovchi zamon.',
      content: `### Future Simple (will)\nKelajakdagi qaror, bashorat va va'da uchun:\n- I **will** help you. (Men senga yordam beraman.)\n- It **won't** (will not) rain tomorrow.\n- **Will** they win the match?`
    },
    {
      title: 'Basic Question Words',
      description: 'Ingliz tilida maxsus so\'roq so\'zlari (Wh- savollari).',
      content: `### Wh- Questions\n- **Who** - Kim? (Who is that?)\n- **What** - Nima? (What is your name?)\n- **Where** - Qayerda? (Where do you live?)\n- **When** - Qachon? (When is your birthday?)\n- **Why** - Nega / nima uchun?`
    }
  ],
  Middle: [
    {
      title: 'Present Perfect vs Past Simple',
      description: 'Sodir bo\'lgan vaqt va hozirgi natija orasidagi katta farq.',
      content: `### Perfect vs Past\n- **Past Simple:** Aniq o'tgan zamonda tugallangan ish, vaqti ma'lum: *I lost my bag yesterday.*\n- **Present Perfect (have/has + V3):** Natija hozir muhim, vaqti noaniq: *I have lost my bag! I can't find it now!*`
    },
    {
      title: 'Passive Voice (Present & Past)',
      description: 'Majhul nisbat - harakat bajaruvchisidan ko\'ra harakatning o\'zi muhim bo\'lganda.',
      content: `### Passive Voice (to be + V3)\n- Active: Leonardo da Vinci painted the Mona Lisa.\n- Passive: **The Mona Lisa was painted by Leonardo da Vinci.**\n- Active: They speak English in Canada.\n- Passive: **English is spoken in Canada.**`
    },
    {
      title: 'Present Perfect Continuous',
      description: 'O\'tmishda boshlanib, hali ham davom etayotgan harakatlar.',
      content: `### Present Perfect Continuous (have/has + been + V-ing)\n- *I have been studying English for 3 years.* (Hali ham o'rganyapman.)\n- *He has been running, that's why he is tired.* (Harakat hozirgina tugadi va natija bor.)`
    },
    {
      title: 'Past Continuous (O\'tgan davomiy zamon)',
      description: 'O\'tgan zamondagi ma\'lum bir vaqtda davom etayotgan harakat.',
      content: `### Past Continuous (was/were + V-ing)\n- *At 7 PM yesterday, I was watching TV.*\n- *When you called (Past Simple), I was sleeping (Past Continuous).*`
    },
    {
      title: 'Past Perfect (O\'tgan mukammal zamon)',
      description: 'O\'tgan zamondagi boshqa bir harakatdan oldin sodir bo\'lgan ish.',
      content: `### Past Perfect (had + V3)\nO'tmishdan oldingi o'tmish (Past in the Past):\n- *The train had already left when we arrived at the station.*\n- *She worked hard because she had failed the exam before.*`
    },
    {
      title: 'Comparative and Superlative Adjectives',
      description: 'Sifat darajalari: qiyosiy va orttirma darajalarni yasash.',
      content: `### Sifat darajalari\n- **Qiyosiy (Comparative):** -er yoki more + Adj -> *taller, more beautiful.*\n- **Orttirma (Superlative):** the -est yoki the most + Adj -> *the tallest, the most beautiful.*\n\n- *Mustasno:* good -> better -> the best | bad -> worse -> the worst.`
    },
    {
      title: 'Modals of Obligation and Advice',
      description: 'Majburiyat va maslahatlarni ifodalash: Must, Have to, should.',
      content: `### Modals of Duty & Advice\n- **Must** - qat'iy majburiyat (shaxsiy): *I must stop smoking.*\n- **Have to** - tashqi qoidalar boyicha majburiyat: *You have to wear a seatbelt.*\n- **Should** - maslahat: *You should sleep more.*`
    },
    {
      title: 'First and Second Conditionals',
      description: 'Shart gaplarning real (1-tur) va noreal (2-tur) holatlari.',
      content: `### Conditionals\n- **1st Conditional (Real future):** If + Present Simple, will + Verb -> *If it rains, we will stay at home.*\n- **2nd Conditional (Imaginary/Unreal present):** If + Past Simple, would + Verb -> *If I won the lottery, I would buy a red sports car.*`
    },
    {
      title: 'Relative Clauses (Munosabat gaplar)',
      description: 'Gaplarni bog\'lash: Who, Which, That, Whose.',
      content: `### Relative Clauses\n- **Who** - odamlar uchun: *The man who lives next door is a doctor.*\n- **Which** - predmet/hayvonlar uchun: *The dog which barked was friendly.*\n- **That** - har ikkala uchun ham ishlatilishi mumkin.`
    },
    {
      title: 'Gerunds vs Infinitives (Part 1)',
      description: 'Infinitive (to do) va Gerund (-ing) ning asosiy qo\'llanilishi.',
      content: `### Gerund vs Infinitive\nBa'zi fe'llar o'zidan keyin faqat -ing (gerund) oladi, ba'zilari esa "to-infinitive":\n- **Gerund (V-ing):** enjoy, avoid, practice, mind -> *I enjoy swimming.*\n- **Infinitive (to + V):** want, decide, promise, hope -> *I want to learn English.*`
    },
    {
      title: 'Countable vs Uncountable Nouns',
      description: 'Sanaladigan va sanalmaydigan otlar hamda Much/Many qo\'llanishi.',
      content: `### Countable / Uncountable\n- **Sanaladigan (Countable):** car, apple, child. *Many* yoki *few* bilan ishlatiladi.\n- **Sanalmaydigan (Uncountable):** water, money, advice, information. *Much* yoki *little* bilan ishlatiladi.`
    },
    {
      title: 'Phrasal Verbs of Daily Life',
      description: 'Iboraviy fe\'llar: fe\'l hamda predlogning birikib yangi ma\'no anglatishi.',
      content: `### Iboraviy Fe'llar\n- **wake up** - uyg'onmoq\n- **get up** - o'rindan turmoq\n- **turn on/off** - yoqmoq/o'chirmoq\n- **look for** - qidirmoq\n- **give up** - taslim bo'lmoq, tashlamoq`
    },
    {
      title: 'Basic Reported Speech (Ko\'chirma gap)',
      description: 'Kimdir nima deganligini uning so\'zlarini o\'zgartirib aytib berish.',
      content: `### Reported Speech\nTog'ri gap ko'chirma gapga aylanganda zamon bir qadam orqaga suriladi (Tense Shift):\n- "I love pizza," said Tom -> *Tom said that he loved pizza.*\n- "I am busy," she said -> *She said she was busy.*`
    },
    {
      title: 'Direct vs Indirect Objects',
      description: 'Vositasiz va vositali to\'ldiruvchilar orasidagi farq va tartib.',
      content: `### Objects\n- **Direct Object:** nima? kimni? -> *I bought a book.*\n- **Indirect Object:** kimga? nima uchun? -> *I bought my brother a book.* (yoki *I bought a book for my brother*).`
    },
    {
      title: 'Adverbs of Frequency and Manner',
      description: 'Harakatning tez-tezligi va qay usulda bajarilishi.',
      content: `### Ravish (Adverbs)\n- **Manner (Qanday?):** quick -> quickly, bad -> badly, fast -> fast.\n- **Frequency (Tez-tezlik):** always, usually, often, sometimes, rarely, never.`
    },
    {
      title: 'Passive Voice in Perfect Tenses',
      description: 'Tugallangan zamonlarda majhul nisbat formasi.',
      content: `### Perfect Passive (have/has been + V3)\n- Active: They have built a new bridge.\n- Passive: **A new bridge has been built.**\n- Active: Had she finished the report?\n- Passive: **Had the report been finished by her?**`
    },
    {
      title: 'Future Continuous Tense',
      description: 'Kelajakda ma\'lum bir vaqt oralig\'ida davom etadigan harakat.',
      content: `### Future Continuous (will be + V-ing)\n- *This time tomorrow, I will be flying to London.*\n- *Don't call me at 9 PM, I will be hosting a live team webinar.*`
    },
    {
      title: 'Reflexive Pronouns (O\'zlik olmoshlari)',
      description: 'Harakat egasiga qaytib tushganda: Myself, Himself, Herself.',
      content: `### Reflexive Pronouns\n- I -> **myself** -> *I cut myself while cooking.*\n- He -> **himself** -> *He taught himself physics.*\n- She -> **herself**, It -> **itself**, We -> **ourselves**, They -> **themselves**.`
    },
    {
      title: 'Tag Questions (So\'roq qo\'shimchalari)',
      description: 'Fikrni tasdiqlash uchun gap oxiridagi bo\'g\'inlar: ..., shunday emasmi?',
      content: `### Tag Questions\nGap bo'lagi tasdiq bo'lsa, tag qismi inkor bo'ladi va aksincha:\n- *You are a student, **aren't you**?*\n- *He doesn't smoke, **does he**?*\n- *We won the game, **didn't we**?*`
    },
    {
      title: 'Conjunctions & Connectors',
      description: 'Bog\'lovchilar: Although, Because, Despite, However.',
      content: `### Connectors\n- **Because** + gap -> *I stayed home because it was cold.*\n- **Despite** + ot/V-ing -> *Despite the cold weather, we went out.*\n- **Although** + gap -> *Although he was tired, he kept working.*`
    },
    {
      title: 'Participle Adjectives (-ed vs -ing)',
      description: 'Qachon -ed va qachon -ing sifatlarini ishlatish kerak.',
      content: `### -ed vs -ing\n- **-ed** sifatlar: kishining his-tuyg'usini ifodalaydi -> *I am bored.* (Men zerikdim)\n- **-ing** sifatlar: zeriktiruvchi holat yoki predmetni bildiradi -> *The movie is boring.* (Kino zerikarli)`
    },
    {
      title: 'Expressing Preferences',
      description: 'Would Rather va Prefer yordamida afzal ko\'rishni ifodalash.',
      content: `### Preferences\n- **Prefer + V-ing to + V-ing:** *I prefer swimming to running.*\n- **Would rather + bare infinitive than + bare infinitive:** *I would rather watch football than play it.*`
    },
    {
      title: 'Determiners & Quantifiers',
      description: 'Miqdor ifodalovchi so\'zlar: Some, Any, No, None, Every, Each.',
      content: `### Quantifiers\n- **Some:** tasdiq gaplarda -> *I have some friends.*\n- **Any:** inkor va so'roq gaplarda -> *Do you have any questions?*\n- **Each / Every:** birlik otlar bilan -> *Each student received a laptop.*`
    },
    {
      title: 'Prefixes & Suffixes',
      description: 'So\'z yasash qoidalari: Affikslar yordamida yangi turdagi so\'zlar hosil qilish.',
      content: `### Word Formation\n- **Prefixes (Old qo'shimcha):** un-, dis-, im-, mis- -> *unhappy, disagree, impossible.*\n- **Suffixes (Ketidan qo'shiladigan):** -ful, -less, -ment, -ness -> *useful, useless, movement, happiness.*`
    },
    {
      title: 'Daily Conversational Idioms',
      description: 'Kundalik muloqotda ko\'p ishlatiladigan sara inglizcha iboralar.',
      content: `### Daily Idioms\n- **Break a leg!** - Omad senga! (Sahnaga chiqishdan oldin)\n- **Under the weather** - Biroz betob bo'lmoq\n- **Once in a blue moon** - Juda ham kamdan-kam hollar\n- **Piece of cake** - Juda oddiy vazifa`
    }
  ],
  Senior: [
    {
      title: 'Third and Mixed Conditionals',
      description: 'O\'tgan zamondagi noreal orzular va ularning bugungi natijasi.',
      content: `### Third & Mixed Conditionals\n- **3rd Conditional:** O'tgan zamondagi voqeaning noreal orzusi: *If I had studied harder (Past Perfect), I would have passed the exam (would have + V3).*\n- **Mixed Conditional:** O'tgan zamon shartining hozirgi natijasi: *If I had won the lottery last year, I would be rich now.*`
    },
    {
      title: 'Subjunctive Mood (Sobiq buyruq mayli)',
      description: 'Muhim rejalarni ifodalash: "It is crucial that she write..."',
      content: `### Subjunctive Mood\nIngliz tilida buyruq va muhim talablarda qat'iy ravishda fe'lning asosi (bare form) ishlatiladi:\n- *It is essential that she **be** present at the team meeting.*\n- *My doctor insisted that he **stop** smoking.* (stops emas, stop)`
    },
    {
      title: 'Advanced Passive (Aytishlaricha...)',
      description: 'Murakkab majhul nisbat: "It is believed that..."',
      content: `### Advanced Passive Voice\n- **It is thought that + sentence:** *It is thought that the thief was an insider.*\n- **Subject + is thought to be + V:** *He is believed to be living in London right now.*\n- *The package was reported to have been delivered.*`
    },
    {
      title: 'Cleft Sentences for Emphasis',
      description: 'Gap doirasidagi muayyan so\'zni alohida ta\'kidlash uchun maxsus qurilmalar.',
      content: `### Cleft Sentences\nGapga urg'u berish usuli:\n- Standart: *I need a warm cup of coffee.*\n- Cleft: **What I need is a warm cup of coffee.**\n- Standart: *Anvar bought the red car.*\n- Cleft: **It was Anvar who bought the red car.**`
    },
    {
      title: 'Gerunds vs Infinitives (Part 2)',
      description: 'Fe\'ldan so\'ng keladigan so\'zga qarab ma\'noning butunlay o\'zgarib ketishi.',
      content: `### Advanced Gerund vs Infinitive\nBa'zi fe'llardan keyin ma'no butunlay o'zgaradi:\n- **Forget/Remember to do:** kelasi harakatni bajarishni eslash -> *Remember to lock the door.*\n- **Forget/Remember doing:** o'tgan voqeani xotirlash -> *I remember locking the door.*\n- **Stop to do:** biror ish qilish uchun to'xtamoq | **Stop doing:** ishni batamom tugatmoq.`
    },
    {
      title: 'Double Comparatives (The more..., the better...)',
      description: 'Ikki holatning bir-biriga bog\'liq ravishda o\'sib yoki kamayib borishi.',
      content: `### Double Comparatives\n- **The + comparative, the + comparative:**\n- *The more you practice, the more fluent you will become.*\n- *The harder we worked on the application, the cleaner the build output became.*`
    },
    {
      title: 'Fronting and Emphatic Structures',
      description: 'Gapning ega bo\'lmagan qismini oldinga o\'tkazish orqali dramatik urg\'u berish.',
      content: `### Fronting\nYozuvda tasviriy yoki dramatik urg'u berish maqsadida ravish yoki predlogni oldinga surish:\n- Standard: *The custom car sped down the track.*\n- Fronted: **Down the track sped the custom car.**\n- Standard: *Her brother sat in the corner.*\n- Fronted: **In the corner sat her brother.**`
    },
    {
      title: 'Advanced Relative Clauses',
      description: 'Whom, Whose, Preposition + Which, Of Which kabi ilg\'or bog\'lovchilar.',
      content: `### Advanced Relative Clauses\n- **Whom:** to'ldiruvchi o'rnida -> *The scholar whom we interviewed yesterday was brilliant.*\n- **Preposition + Which:** *This is the room in which we held the meeting.*\n- **Of which / Of whom:** *They have three children, all of whom are physicists.*`
    },
    {
      title: 'Past Modal Verbs (O\'tgan zamon taxminlari)',
      description: 'Should have, Must have, Could have, Might have kabi konstruktsiyalar.',
      content: `### Past Modals\n- **Must have + V3:** o'tmishdagi qat'iy ishonch -> *He must have missed the bus.*\n- **Should have + V3:** afsuslanish, bajarilmagan vazifa -> *You should have studied harder.*\n- **Could have + V3:** imkoniyat bor edi, lekin qilinmadi -> *She could have escaped.*`
    },
    {
      title: 'Advanced Reported Speech',
      description: 'Reporting verbs (insist, deny, propose, claim) kabi ilg\'or so\'zlar bilan gap tuzish.',
      content: `### Advanced Reporting Verbs\nTomoshabin yoki o'quvchiga sayqallangan gaplarni "said" yoki "told" emas, maxsus fe'llar bilan yetkazish:\n- *He denied stealing the confidential database keys.*\n- *She threatened to delete the folder if she didn't get a raise.*\n- *The doctor recommended taking five minutes rest.*`
    },
    {
      title: 'Participle Clauses (Aktiv va passiv sifatdoshlar)',
      description: 'Gaplarni qisqartirish: Having finished, Written in...',
      content: `### Participle Clauses\nMurakkab gaplarni chiroyli qisqartirish usuli:\n- *Having finished his homework (After he had finished), Tom went out to play games.*\n- *Frightened by the loud noise (Because he was frightened), the dog hid under the table.*`
    },
    {
      title: 'Inversion with Negative Adverbials',
      description: 'Under no circumstances, Seldom, Rarely yordamida inversiya yasash.',
      content: `### Negative Inversion\nSalbiy yuklamalar gap boshida kelsa, so'roq gapi kabi inversiya yasaladi:\n- *Seldom have I witnessed such a brilliant developer master engineering.*\n- *Under no circumstances should you ever expose internal API keys to the browser.*`
    },
    {
      title: 'Wish and If Only (Afsuslar)',
      description: 'Hozirgi va o\'tgan zamondagi xatolar yoki orzular bo\'ylab pushaymonlik.',
      content: `### Wish / If Only\n- **Wish + Past Simple:** hozirgi noreal istaklar -> *I wish I lived in California.*\n- **Wish + Past Perfect:** o'tmishdagi afsuslar -> *I wish I hadn't spent all my money yesterday.*\n- **Wish + Would:** boshqalarning odatidan shikoyat -> *I wish he would stop talking.*`
    },
    {
      title: 'Advanced Phrasal Verbs',
      description: 'Ilg\'or va murakkab darajadagi iboraviy fe\'llar va ularning sinonimlari.',
      content: `### Advanced Phrasal Verbs\n- **Put up with** - Chidamoq (tolerate)\n- **Look down on** - Mensimaslik (despise)\n- **Come up with** - Reja/g'oya o'ylab topmoq\n- **Go through with** - Oxirigacha yetkazmoq\n- **Back down** - Chekinmoq`
    },
    {
      title: 'Future Perfect & Perfect Continuous',
      description: 'Kelajakda ma\'lum bir muddatgacha tugallanadigan ishlar.',
      content: `### Future Perfect Tenses\n- **Future Perfect (will have + V3):** Kelajakdagi ma'lum vaqtgacha tugaydigan ish -> *By next year, I will have finished my app.* (men tugatib bo'laman)\n- **Future Perfect Continuous:** *By December, I will have been working here for ten years.*`
    },
    {
      title: 'Noun Clauses as Objects & Subjects',
      description: 'Ega yoki to\'ldiruvchi rolidagi gap bo\'laklari: "What he did was astonishing".',
      content: `### Noun Clauses\nMustaqil gap bir ot kabi butun boshli gapda ega yoki to'ldiruvchi boladi:\n- **Ega:** *Whichever design option we pick will guide our style choices.*\n- **To'ldiruvchi:** *The professor explained how the physics formulas work.*`
    },
    {
      title: 'Writing Cohesive Devices',
      description: 'Insholarda jumlalarni bir-biriga bog\'lovchi akademik termin va so\'zlar.',
      content: `### Cohesion in Essays\nYozma ishlarda silliq o'tishni ta'minlaydi:\n- **Furthermore / In addition:** Fikr qo'shish\n- **Conversely / On the flip side:** Qarama-qarshilik\n- **Consequently / Accordingly:** Natija ko'rsatish`
    },
    {
      title: "Ellipsis and Substitution",
      description: "Takrorlanuvchi so'zlarni tushirib qoldirish orqali gapni lo'nda va chiroyli qilish.",
      content: `### Ellipsis & Substitution\nYozuv tahririda bir xil so'zni qaytarmaslik san'ati:\n- Ellipsis: *She loves reading books and he [loves reading] articles.*\n- Substitution: *Do you want to buy these shoes? No, I would prefer those **ones**.*`
    },
    {
      title: 'Hedging and Softening Language',
      description: 'Akademik matnlarda qat\'iy bayonotlardan qochish va yumshoq tilda yozish.',
      content: `### Academic Hedging\nFikrni mutloq deb aytmasdan, ehtimollik ohangida yetkazish:\n- No-Hedging: *This program fails on slow computers.*\n- Hedged: *This program **tends to** fail on computers with a low-tier processor.*\n- *It is arguably one of the most significant breakthroughs of the century.*`
    },
    {
      title: 'Distancing Devices (Seem, Appear, Seemingly)',
      description: 'Xabarlar yoki fikrlarni masofaviy va xolis ifodalash usullari.',
      content: `### Distancing\n- *It would appear that some server resources are currently unresponsive.*\n- *There seems to be an error inside the repository compilation cycle.*`
    },
    {
      title: 'Collocations for Academic IELTS',
      description: 'IELTS imtihonida yuqori ball beruvchi barqaror so\'z birikmalari (Collocations).',
      content: `### Academic Collocations\n- **Adhere to** - Qat'iy amal qilmoq (adhere to instructions)\n- **Alleviate poverty** - Kambag'allikni yumshatmoq/kamaytirmoq\n- **Concerted effort** - Birgalikdagi harakatlar\n- **Adverse affects** - Salbiy oqibatlar`
    },
    {
      title: 'Formal vs Informal Register Shifts',
      description: 'Vaziyatga mos ravishda rasmiy va norasmiy tillar orasidagi mutanosiblik.',
      content: `### Register Shifts\n- Informal: *He got really mad and started shouting.*\n- Formal: *He became exceptionally agitated and commenced shouting.*\n- Informal: *We need to fix this fast.*\n- Formal: *Immediate remedial action is required to resolve this state.*`
    },
    {
      title: 'Complex Prepositional Collocations',
      description: 'In light of, with a view to, in compliance with kabi birikmalar.',
      content: `### Prepositional Collocations\n- **In compliance with:** *All components are configured in compliance with standard instructions.*\n- **With a view to + V-ing:** *We compiled the source code with a view to hosting the applet on Cloud Run.*`
    },
    {
      title: 'Advanced Essay Structures & Concession',
      description: 'Insholarda murosasozlik (concession) jumlalari va strukturalar.',
      content: `### Concession\nFikrning qarama-qarshi tomonini tan olgan holda o'z g'oyasini isbotlash:\n- *Granted, online learning suffers from a lack of physical interaction; nevertheless, its unparalleled flexibility compensates for this deficit.*`
    },
    {
      title: 'Advanced Modifiers and Intensifiers',
      description: 'Strikingly, Utterly, Profoundly kabi ta\'kidlovchi ilg\'or so\'zlar.',
      content: `### Advanced Modifiers\n- **Utterly** ridiculous (Butunlay bemani / ahmoqona)\n- **Profoundly** grateful (Cheksiz darajada minnatdor)\n- **Strikingly** beautiful / different (Ko'zga yaqqol tashlanadigan darajada chiroyli / farqli)`
    }
  ],
  Master: [
    {
      title: 'Academic Writing & Inversion',
      description: 'Ilmiy va akademik maqolalar uchun yozish uslubi hamda inversiyalar.',
      content: `### Academic Inversion\nMaster darajadagi eng mukammal til namunalari:\n- *Rarely does a research team encounter such dynamic metadata.*\n- *Not only did they introduce a new engine, but they also refined the user interface to perfection.*`
    },
    {
      title: 'Complex Syntax & Sentence Patterns',
      description: 'Murakkab sintaktik tuzilmalar va gap bo\'laklarining chuqur tahlili.',
      content: `### Complex Syntax\nKo'p bosqichli to'ldiruvchilar va yuklamali gaplar tahlili:\n- *Complex clauses provide the structural scaffold within which academic eloquence or formal prose can flourish, without falling victim to visual clutter.*`
    },
    {
      title: 'Advanced Subjunctive & Formulaic Expressions',
      description: 'Qadimiy va rasmiy formulali buyruq mayli: "Be that as it may", "Lest..."',
      content: `### Formulaic Subjunctive\n- **Be that as it may** - Shunday bo'lsa ham (no matter what)\n- **Lest** + subject + subjunctive Verb - biror salbiy voqea sodir bo'lib qolmasligi uchun (for fear that):\n- *We designed the architecture with utmost caution, **lest the application crash** during peak utilization.*`
    },
    {
      title: 'Rhetorical Devices & Figures of Speech',
      description: 'Nutq so\'zlash san\'atida ritorik savollar, alliteratsiya va metaforalar.',
      content: `### Rhetorics\n- **Anaphora:** jumlalarning boshida bir xil so'zning qaytarilishi -> *We shall fight on the beaches, we shall fight on the landing grounds.*\n- **Chiasmus:** parallel jumlalarda so'z tartibini teskari qilish.`
    },
    {
      title: 'Advanced Compound Conditionals',
      description: 'Should we, Were we to, Had we known kabi if-siz shart gaplar.',
      content: `### Conditional Inversion\n- **Should you require** assistance (If you require...)\n- **Were we to launch** the beta version today (If we were to launch...)\n- **Had we known** about the framework incompatibilities (If we had known...)`
    },
    {
      title: 'Literary Devices and Prose Structure',
      description: 'Badiiy ingliz tilida so\'zlarni nozik tanlash sirlari.',
      content: `### Literary Prose\n- *A meticulous selection of words, layered with delicate irony and profound metaphors, transforms standard dialogue into an immersive literary experience.*`
    },
    {
      title: 'High-level Idiomatic Syntax (Adj + as/though)',
      description: '"Difficult though it may seem, we resolved to complete the task" kabi gaplar.',
      content: `### Idiomatic Syntax\n- Adjective / Adverb + **as / though** + subject + verb:\n- *Difficult though it was, they engineered a complete TypeScript platform from scratch.*\n- *Hard as they tried, they could not bypass the sandboxed port constraints.*`
    },
    {
      title: 'Academic Collocation Patterns',
      description: 'C1-C2 darajadagi eng yuqori ilmiy va publitsistik so\'z birikmalari.',
      content: `### Master Collocations\n- **Cognitive development** - Ziyraklikning rivojlanishi (aqliy yuksalish)\n- **Dichotomy between** - Ikki qarama-qarshi tomon o'rtasidagi farq\n- **Salient feature** - Eng ko'zga ko'ringan o'ziga xos xususiyat`
    },
    {
      title: 'Subordinate Clause Complementation',
      description: 'Murakkab ergash gaplarning o\'zaro bog\'lanish qonuniyatlari.',
      content: `### Complementation\n- *The thesis that architectural honesty remains paramount in design informs our ultimate development priorities.*`
    },
    {
      title: 'Complex Inversion with "Only & Not until"',
      description: '"Only after", "Not until" birikmalari qo\'llanganda inversiyaning o\'ziga xosligi.',
      content: `### Only & Not Until Inversion\nUshbu gaplarda inversiya gapning boshida emas, balki asosi bo'lgan ikkinchi bo'lagida sodir bo'ladi:\n- *Not until the deployment system succeeded **did the developer find** closure.*`
    },
    {
      title: 'Nuances in Lexical Semantics',
      description: 'Bir-biriga juda o\'xshash so\'zlar orasidagi nozik semantik farqlar (Ma\'nodoshlik).',
      content: `### Lexical Semantics\nSo'zlarning o'ta nozik farqi:\n- **Famous** (Mashhur - ijobiy)\n- **Notorious** (Salbiy nom chiqargan)\n- **Eminent** (O'z sohasida hurmatga sazovor, nufuzli)`
    },
    {
      title: 'High-level Synthesis & Paraphrasing',
      description: 'Murakkab matnlardan xulosalar olish va mustaqil so\'zlar bilan ifodalash san\'ati.',
      content: `### Synthesis & Paraphrasing\nAsl matn ma'nosini to'la saqlagan holda murakkab sintaktik tuzilma va yuqori darajadagi sinonim so'zlar bilan gapni butunlay qayta yozish.`
    },
    {
      title: 'Structural Cohesion in Essay Composition',
      description: 'Yozma ishlarda paragraf va g\'oyalar o\'rtasidagi o\'ta mustahkam bog\'lanishni hosil qilish.',
      content: `### Structural Cohesion\n- Teylor va uning jamoasi tomonidan yozilgan akademik andozalar.\n- Tezis gapni har bir paragrafning mavzu gapi bilan bog'lash, mantiqiy silsilani mukammallashtirish.`
    },
    {
      title: 'Syntactic Density in Oratorical Speeches',
      description: 'Mashhur notiqlarning nutqlaridagi sintaktik zichlik va uning tinglovchiga ta\'siri.',
      content: `### Syntactic Density\nKo'p darajali murakkab tuzilmali gaplarning, kishi diqqatini bir nuqtada ushlab turish uchun notiqlikda qo'llanishi.`
    },
    {
      title: 'Archaic & Formal Conjugations',
      description: 'Qadimiy ingliz tilidagi va kitobiy fe\'l tuslanishlari (Thou, Thine, etc).',
      content: `### Archaic Grammar\n- **Thou art** -> You are\n- **He hath** -> He has\n- *Lest those elements perish from this Earth...*`
    },
    {
      title: 'Nominalization in Science & Research Text',
      description: 'Fe\'l va sifatlarni otga aylantirish orqali matnning ilmiylik darajasini oshirish.',
      content: `### Nominalization\n- Verb: *We analyzed the data and discovered a bug.*\n- Nominalized: *The **analysis** of the data led to the **discovery** of a bug.*`
    },
    {
      title: 'Discourse Markers in Philosophical Essays',
      description: 'Falsafiy asarlarda g\'oyalar zanjirini bog\'lovchi maxsus belgi-jumlalar.',
      content: `### Discourse Markers\n- **Be that as it may** - Nima bo'lganda ham\n- **By token of** - Alomatki / dalildirki\n- **Inasmuch as** - Chindan ham / shu sababli`
    },
    {
      title: 'Multi-meaning Idioms & Phrasal Clusters',
      description: 'Bitta iboraviy fe\'lning 5 xilgacha turlicha ma\'noga ega bo\'lishi.',
      content: `### Phrasal Clusters\n- **Take off** - Havoga ko'tarilmoq (samolyot), kiyimni yechmoq, muvaffaqiyatga erishmoq, ishdan ta'til olmoq.`
    },
    {
      title: 'Pragmatics and Speech Acts',
      description: 'Muloqot ortidagi yashirin maqsad va pragmatik kelishuvlar.',
      content: `### Pragmatics\nGapning so'zma-so'z tarjimasi emas, kontekstual va ijtimoiy ma'nosi. "Could you pass the salt?" deganda qila olish qobiliyati emas, iltimos so'raladi.`
    },
    {
      title: 'Idiomatic Metaphors and Cultural Nuance',
      description: 'Madaniyat bilan bog\'liq iboralar va o\'xshatishlar tahlili.',
      content: `### Cultural Metaphors\n- **Bite the bullet** - Kuchli qiyinchilikka qarshi chidab turmoq\n- ** Spill the beans** - Sirlarni fosh qilib qo'ymoq\n- **A storm in a teacup** - Arzimas muammodan katta vahima ko'tarish`
    },
    {
      title: 'Lexical Density vs Grammatical Metaphor',
      description: 'Ghalli va Xellidey nazariyalari bo\'yicha gap sintaksisini o\'zgartirish darsi.',
      content: `### Lexical Density\nHar bir gapdagi mustaqil content so'zlar ulushining ko'payishi matn yukini tizimlashtiradi.`
    },
    {
      title: 'Stylistic Syntactic Variation',
      description: 'Mualliflik uslubini yaratishda turlicha gap qurilmalarini aralashtirib yozish.',
      content: `### Stylistic Variation\nKalta sodda gaplar, o'rta bog'langan va uzun ergashgan murakkab gaplarni matnda mahorat bilan aralashtirib, ritm hosil qilish.`
    },
    {
      title: 'Complex Subject-Verb Concord',
      description: 'Ega va fe\'l orasidagi moslik: qiyin va chalg\'ituvchi vaziyatlar grammatikasi.',
      content: `### Complex Concord\n- *A group of students **is** arriving today.* (Group birlikda)\n- *Neither my friends nor Anvar **is** attending.* (Fe'lga yaqin ega Anvar)\n- *None of the water **was** lost.*`
    },
    {
      title: 'Prepositional Variations & Style Quirks',
      description: 'Bir-biriga juda yondosh va almashtirib qo\'llanishi mumkin bo\'lgan predloglar.',
      content: `### Style Quirks\n- Differ *from* vs Differ *with*\n- Comply *with* vs Object *to*\n- *Adhere to instructions at all times with utmost precision.*`
    },
    {
      title: 'Ultimate Course Capstone: Academic Eloquence',
      description: 'Ingliz tilshunosligidagi eng mukammal darajadagi yakuniy dars va imtihon.',
      content: `### Academic Eloquence Capstone\nC2 darajasiga yetgan til sohibining yakuniy imtihoni. Barcha murakkab grammatikalar, iboralar va akademik so'z boyligining silliq va ishonchli sintezi.`
    }
  ]
};

// Programmatic Generator for 15 High-Quality Questions per Topic
const generateQuestionsForTopic = (level: Level, topicIdx: number, title: string): QuizQuestion[] => {
  const questions: QuizQuestion[] = [];
  
  // High-craft deterministic option pools depending on level
  const juniorVocabulary = ['Apple', 'Book', 'Car', 'Good morning', 'School', 'Teacher', 'Student', 'Happy', 'Doctor', 'Tashkent', 'English', 'Pencil', 'House', 'Water', 'Table'];
  const juniorTranslations = ['Olma', 'Kitob', 'Mashina', 'Xayrli tong', 'Maktab', 'O\'qituvchi', 'Talaba', 'Xursand', 'Shifokor', 'Toshkent', 'Ingliz tili', 'Qalam', 'Uy', 'Suv', 'Stol'];
  
  const middleVocabulary = ['Acquire', 'Beneficial', 'Capable', 'Efficient', 'Hazard', 'Abundant', 'Genuine', 'Inevitable', 'Fascinating', 'Analyze', 'Considerable', 'Crucial', 'Diverse', 'Implement', 'Incorporate'];
  const middleTranslations = ['Egallamoq', 'Foydali', 'Qobiliyatli', 'Samarali', 'Xavf', 'Mo\'l-ko\'l', 'Haqiqiy', 'Muqarrar', 'Ma\'ftunkor', 'Tahlil qilmoq', 'Sezilarli', 'O\'ta muhim', 'Turli-tuman', 'Amalga oshirmoq', 'Kiritmoq'];

  const seniorVocabulary = ['Subjunctive', 'Inversion', 'Cleft Sentence', 'Concession', 'Emphatic', 'Cohesive', 'Ellipsis', 'Substitution', 'Hedging', 'Distancing', 'Collocation', 'Modifier', 'Intensifier', 'Profound', 'Strikingly'];
  const seniorExplanations = [
    'Subjunctive moodda birlik uchinchi shaxs uchun fe\'lga -s qo\'shilmaydi va doim bare shaklda keladi.',
    'Salbiy yuklama yoki ravish gap boshida mantiqiy urg\'u berish uchun kelganda yordamchi fe\'l egadan oldinga o\'tadi.',
    'Urg\'uli kleft gap "What I need is..." yoki "It is... that" shaklida mantiqiy urg\'u berib gapni mustahkamlaydi.',
    'Murosasozlik (concession) ziddiyat qo\'shib berilgan argumentlarni chiroyli inko-tasdiqlaydi.',
    'Emphatic struktura "does write" yoki "did go" kabi yordamchi fe\'llar tasdiq gapi ichida kelganda qo\'llaniladi.',
    'Cohesive bog\'lovchilar butun insho ritmini o\'zaro mantiqiy silsilada jipslaydi.',
    'Ellipsis - bir xil so\'zlarni tushirib qoldirish orqali gapni lo\'ndalashtirib, takrorlanishdan saqlashdir.',
    'Substitution - ot, iborani takrorlamasdan o\'rniga "one/ones/do so" so\'zlarini qo\'llaydi.',
    'Hedging - ilmiy andozalarda fikirni o\'ta mutloq qilib yubormaslik uchun "tends to/arguably" kabi yumshatuvchilarni kiritish.',
    'Distancing - xabarni xolis, masofaviy "seem/appear to be" kabi dastalarda taqdim qilish.',
    'Collocation - tilda barqaror, birga olinadigan va tabiiy chiqadigan so\'z juftliklaridir.',
    'Sifat yoki ravishni o\'ziga xos tarzda ta\'kidlash va to\'ldirish uchun maxsus qo\'shimchalar.',
    'Oddiy sifatlarning belgi-mohiyatini kuchaytiruvchi yoki o\'zgartiruvchi jozibador so\'zlar.',
    'Profoundly so\'zi cheksiz yoki o\'ta kuchli minnatdorlik yoki bilim ma\'nosida collocate bo\'ladi.',
    'Strikingly so\'zi yaqqol ko\'zga tashlanadigan farq yoki joziba ifodasini ifodalaydi.'
  ];

  for (let q = 0; q < 15; q++) {
    const qId = `q-${level.toLowerCase()}-${topicIdx}-${q}`;
    let questionText = '';
    let options: string[] = [];
    let correctAnswer = 0;
    let explanationText = '';

    if (level === 'Junior') {
      const vocabWord = juniorVocabulary[q % juniorVocabulary.length];
      const correctUz = juniorTranslations[q % juniorTranslations.length];
      const wrongUz1 = juniorTranslations[(q + 1) % juniorTranslations.length];
      const wrongUz2 = juniorTranslations[(q + 2) % juniorTranslations.length];
      const wrongUz3 = juniorTranslations[(q + 3) % juniorTranslations.length];

      switch(q % 3) {
        case 0:
          questionText = `"${vocabWord}" so'zining o'zbekcha tarjimasini toping.`;
          options = [correctUz, wrongUz1, wrongUz2, wrongUz3].sort();
          correctAnswer = options.indexOf(correctUz);
          explanationText = `"${vocabWord}" so'zi o'zbek tiliga "${correctUz}" deb tarjima qilinadi.`;
          break;
        case 1:
          questionText = `Ushbu gapda qaysi so'z tushib qolgan? "${vocabWord === 'Table' ? 'The book is ___ the table.' : 'I see a ___.'}"`;
          options = [vocabWord === 'Table' ? 'on' : vocabWord, 'under', 'nice', 'from'].sort();
          const targetAnswer = vocabWord === 'Table' ? 'on' : vocabWord;
          correctAnswer = options.indexOf(targetAnswer);
          explanationText = `Gapda to'g'ri bog'liqlikni ta'minlaydigan so'z: "${targetAnswer}".`;
          break;
        case 2:
          questionText = `Quyidagilardan qaysi biri to'g'ri grammatik shaklda berilgan?`;
          const correctSentence = `I have a ${vocabWord.toLowerCase()}.`;
          const wrongSentence1 = `I has any ${vocabWord.toLowerCase()}.`;
          const wrongSentence2 = `I having a ${vocabWord.toLowerCase()}.`;
          const wrongSentence3 = `He have a ${vocabWord.toLowerCase()}.`;
          options = [correctSentence, wrongSentence1, wrongSentence2, wrongSentence3].sort();
          correctAnswer = options.indexOf(correctSentence);
          explanationText = `Birinchi shaxs birlikda "I have" shakli to'g'ri ishlatiladi.`;
          break;
      }
    } else if (level === 'Middle') {
      const vocabWord = middleVocabulary[q % middleVocabulary.length];
      const correctUz = middleTranslations[q % middleTranslations.length];
      const wrongUz1 = middleTranslations[(q + 2) % middleTranslations.length];
      const wrongUz2 = middleTranslations[(q + 4) % middleTranslations.length];
      const wrongUz3 = middleTranslations[(q + 5) % middleTranslations.length];

      switch(q % 3) {
        case 0:
          questionText = `Choose the correct translation for the C1/B2 academic word "${vocabWord}":`;
          options = [correctUz, wrongUz1, wrongUz2, wrongUz3].sort();
          correctAnswer = options.indexOf(correctUz);
          explanationText = `"${vocabWord}" in Uzbek means "${correctUz}". Perfect for expanding middle level vocabulary.`;
          break;
        case 1:
          questionText = `Which option correctly completes the sentence: "We must ___ the new features in our app."`;
          const correctOption = "implement";
          options = [correctOption, "implements", "implemented", "implementing"].sort();
          correctAnswer = options.indexOf(correctOption);
          explanationText = `Modal fe'l "must" dan keyin doimo fe'lning asosi (bare infinitive) ishlatiladi.`;
          break;
        case 2:
          questionText = `Identify the correct usage of Past Simple and Present Perfect in the same context:`;
          const choice1 = `I have finished my project yesterday and now I am happy.`;
          const choice2 = `I finished my project yesterday, and so I have achieved my goal.`;
          const choice3 = `I finish my project yesterday when you had called.`;
          const choice4 = `I have finish my project and I will went to the movies.`;
          options = [choice1, choice2, choice3, choice4].sort();
          correctAnswer = options.indexOf(choice2);
          explanationText = `"Yesterday" bo'lgani uchun o'tgan zamondagi voqea "finished" (Past Simple), natijasi esa hozirgi reallik bilan bog'langani uchun "have achieved" (Present Perfect) ishlatiladi.`;
          break;
      }
    } else { // Senior & Master
      const term = seniorVocabulary[q % seniorVocabulary.length];
      const exp = seniorExplanations[q % seniorExplanations.length];
      const correctTermStr = `It represents the core concept of ${term}.`;
      const wrongTermStr1 = `It describes basic prepositional syntax.`;
      const wrongTermStr2 = `It has to do with spelling guidelines.`;
      const wrongTermStr3 = `It applies only to irregular noun plurals.`;

      switch(q % 3) {
        case 0:
          questionText = `Which statement best explains the C1-C2 grammatical rule of "${term}"?`;
          options = [exp, "It is used only in colloquial conversations inside families.", "It is a rare dialect spoken strictly in North English territories.", "It relates to standard greeting formats."].sort();
          correctAnswer = options.indexOf(exp);
          explanationText = `${term} rules: ${exp}`;
          break;
        case 1:
          questionText = `Identify the grammatically perfect advanced sentence showcasing "${term}":`;
          let sentence = "";
          if (term === 'Inversion') sentence = "Never have I seen such a strikingly compiled interface.";
          else if (term === 'Subjunctive') sentence = "It is critical that the server administrator restart the service immediately.";
          else if (term === 'Cleft Sentence') sentence = "What we desperately need is an offline storage synchronization mechanism.";
          else sentence = `Having completed the capstone, she successfully mastered ${term}.`;
          
          options = [
            sentence,
            `I am having not enjoyed the exam yesterday.`,
            `She insisted that they must to go home quickly.`,
            `The more he is working hard, he wins the prize.`
          ].sort();
          correctAnswer = options.indexOf(sentence);
          explanationText = `This sentence beautifully showcases the high-crafted syntax of ${term} inside formal writeups.`;
          break;
        case 2:
          questionText = `In academic C1-C2 English, how does the concept of "${term}" improve writing flow?`;
          options = [
            "By establishing cohesive links, enhancing syntactic variety, and refining semantic accuracy.",
            "By ensuring the writer uses basic verbs such as 'look' and 'get' to keep it simple.",
            "By adding random punctuations to break down visual density.",
            "By repeating the subject at the beginning of every consecutive sentence."
          ].sort();
          correctAnswer = 0;
          explanationText = `Mastering ${term} allows the author to achieve exceptional cohesion, eloquent syntaxes, and stylistic variation.`;
          break;
      }
    }

    questions.push({
      id: qId,
      question: questionText,
      options: options,
      correctAnswer: correctAnswer,
      explanation: explanationText
    });
  }

  return questions;
};

// Generate exactly 100 high-quality topics across 4 levels (25 lessons per level)
export const CURRICULUM: CourseLevel[] = ['Junior', 'Middle', 'Senior', 'Master'].map((level) => {
  const levelTopics = TOPICS_BY_LEVEL[level as Level];
  
  const formattedLessons: Lesson[] = levelTopics.map((topic, i) => {
    const lessonId = `${level.toLowerCase()[0]}${level === 'Master' ? 'a' : ''}-${i + 1}`;
    
    // Construct lesson
    return {
      id: lessonId,
      title: topic.title,
      description: topic.description,
      type: i === 0 && level === 'Junior' ? 'video' : (i % 3 === 0 ? 'vocabulary' : 'grammar'),
      videoUrl: i === 0 && level === 'Junior' ? 'https://www.youtube.com/embed/75p-N9YKqNo' : undefined,
      content: topic.content,
      quiz: generateQuestionsForTopic(level as Level, i + 1, topic.title)
    };
  });

  return {
    id: level as Level,
    name: level === 'Junior' ? 'Junior (Starter)' : level === 'Middle' ? 'Middle (Intermediate)' : level === 'Senior' ? 'Senior (Advanced)' : 'Master (Expert)',
    description: level === 'Junior' ? 'Boshlang\'ich bosqich: Ingliz tilini noldan o\'rganishni boshlaganlar uchun.' : level === 'Middle' ? 'O\'rta bosqich: Kundalik muloqot va asosiy grammatikani biladiganlar uchun.' : level === 'Senior' ? 'Yuqori bosqich: Murakkab mavzular va senyorlar uchun maxsus bo\'lim.' : 'Masterlar uchun: Akademik daraja va C1-C2 mavzulari.',
    color: level === 'Junior' ? 'bg-emerald-500' : level === 'Middle' ? 'bg-blue-500' : level === 'Senior' ? 'bg-purple-600' : 'bg-amber-600',
    lessons: formattedLessons
  };
});
