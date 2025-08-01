// Sitenin kalbini oluşturan arayüz. Bu, her bir anının yapısını tanımlar.
export interface Memory {
  id: number;
  img: string; // public klasöründeki fotoğrafın yolu
  text: string; // Fotoğrafa eşlik edecek şiirsel metin
}

// FOTOĞRAF VE ANILAR LİSTESİ
// Bu liste, sitenin sinematik akışını baştan sona oluşturur.
export const MEMORIES: Memory[] = [
  // Sahne 1: Giriş. Bu özel bir durumdur, fotoğrafı yoktur.
  { id: 0, img: '', text: "Bir hikaye..." },

  // Sahne 2: Anılar Akışı. Her fotoğraf kendi hikayesini anlatır.
  // Bu akışı annenizin hayat yolculuğuna göre mantıklı bir sıraya dizdim.

  // --- Kendi Işığı ve Gençlik Yılları ---
  { id: 1, img: '/resim9annem.jpg', text: "Her şeyin başladığı o ilk ışık." },
  { id: 2, img: '/resim12annem.jpg', text: "Kendi adımlarıyla dünyayı keşfederken." },
  { id: 3, img: '/resim15annem.jpg', text: "Gözlerinde geleceğin hayalleri..." },
  { id: 4, img: '/resim16annem.jpg', text: "Zarafetiyle etrafını aydınlatan." },
  
  // --- Hayatını Paylaştığı İnsan (Annem ve Babam) ---
  { id: 5, img: '/resim18annembabam.jpg', text: "Ve sonra, o ışığı paylaşacağı bir yoldaş buldu." },
  { id: 6, img: '/resim20annembabam.jpg', text: "Birlikte yazılan bir aşk masalı." },
  { id: 7, img: '/resim24annembabam.jpg', text: "Aynı yöne bakan iki kalp." },
  { id: 8, img: '/resim26annembabam.jpg', text: "Yılların eskitemediği o sıcak bağ." },

  // --- Anneliğin Başlangıcı (Annen ve Sen) ---
  { id: 9, img: '/resim1annemveben.jpg', text: "Ve hayatımıza dokunan o sihirli el." },
  { id: 10, img: '/resim3annemveben.jpg', text: "Yol gösteren bir fener gibi oldun." },
  { id: 11, img: '/resim4annemveben.jpg', text: "En güvenli liman, en sıcak kucak." },
  { id: 12, img: '/resim27annemben.jpg', text: "Paylaşılan her an, eşsiz bir hazine." },

  // --- Aile Büyürken (Kardeşler ve Hep Birlikte) ---
  { id: 13, img: '/resim5annemveburak.jpg', text: "Bir can yoldaşına daha kol kanat gerdi." },
  { id: 14, img: '/resim7annemveburak.jpg', text: "Sevginle büyüyen o güzel fidanlar." },
  { id: 15, img: '/resim8annemburakveben.jpg', text: "Ve kurduğun o sıcak yuva: bizim kalemiz." },
  { id: 16, img: '/resim14aile.jpg', text: "Sofradaki bereket, kahkahadaki neşe." },
  
  // --- Zamanın İçinden Anılar ---
  { id: 17, img: '/resim11annem.jpg', text: "Hiç bitmeyen bir bahar gibi." },
  { id: 18, img: '/resim13annemveben.jpg', text: "Sabrın ve şefkatin gücüyle." },
  { id: 19, img: '/resim29annemben.jpg', text: "Birlikte yürünen o güzel yollar." },
  { id: 20, img: '/resim25annembabam.jpg', text: "Kelimelere sığmayan bir sevgi yumağı." },
  { id: 21, img: '/resim19annembabam.jpg', text: "Her dokunuşunda bir şifa olan." },
  { id: 22, img: '/resim2annemveben.jpg', text: "Her zorlukta yanımızda duran o dağ." },
  { id: 23, img: '/resim21annembabam.jpg', text: "Aşılmaz denilen engelleri aşan inanç." },
  { id: 24, img: '/resim6annemveburak.jpg', text: "Kalbindeki o eşsiz, şefkatli ritim." },
  { id: 25, img: '/resim22annem.jpg', text: "Dans eden, hayata bağlı bir ruh." },
  { id: 26, img: '/resim17annem.jpg', text: "Bir gülüşünle dünyayı değiştiren." },
  { id: 27, img: '/resim23annem.jpg', text: "Ektiğin tüm iyilik tohumları için..." },
  { id: 28, img: '/resim28annem.jpg', text: "Ve hiç solmayan o güzel umudun için..." },
  
  // Sahne 5: Final Sahnesi. Bu en etkili fotoğrafla kapanışı yapar.
  // En güzel portre fotoğrafını buraya koydum.
  { id: 29, img: '/resim10annem.jpg', text: "İyi ki Doğdun Annem." },
];