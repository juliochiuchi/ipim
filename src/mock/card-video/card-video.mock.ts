import PRFabioImage from '@/assets/prfabio.jpg'
import BryanSeminaristaImage from '@/assets/bryan-seminarista.jpg'

export const availableVideos = [
  {
    id: 1,
    title: 'Caminhando com Jesus #1',
    description: 'Sábado de manhã.',
    imagePerson: PRFabioImage,
    namePerson: 'Fábio',
    role: 'Pastor da IPIM',
    urlVideo: 'https://www.youtube.com/embed/1bbD8r4nfS8?si=L8n2TpsQFpSaERcW',
    dateVideo: 'Sábado, 01 de fevereiro, 21h00',
    detailVideo: 'Conteúdo liberado',
    liveVideo: false,
    messageName: 'Caminhando com Jesus #1',
    standBy: false,
  },
  {
    id: 2,
    title: 'Banda EVEN e Seminarista Bryan',
    description: 'Adoração e palavra',
    imagePerson: BryanSeminaristaImage, // or undefined
    namePerson: 'Bryan',
    role: 'Seminarista da Vitral',
    urlVideo: 'https://www.youtube.com/embed/008cUMoPcEg?si=OoIfpbAWKFsPaUQd',
    dateVideo: 'Sábado, 01 de fevereiro, 21h00',
    detailVideo: 'Conteúdo liberado',
    liveVideo: false,
    messageName: 'Adoração e palavra',
    standBy: false,
  },
  {
    id: 3,
    title: 'Caminhando com Jesus #2',
    description: 'Domingo de manhã',
    imagePerson: PRFabioImage,
    namePerson: 'Fábio',
    role: 'Pastor da IPIM',
    urlVideo: 'https://www.youtube.com/embed/pspZzwN6bz0?si=VkRi--rFXLD_UPWG',
    dateVideo: 'Domingo, 02 de fevereiro, 09h30',
    detailVideo: 'Conteúdo liberado',
    liveVideo: false,
    messageName: 'Caminhando com Jesus #2',
    standBy: false,
  },
]
