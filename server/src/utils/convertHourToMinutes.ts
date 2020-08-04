export default function convertHourToMinutes(time: string) {
  
  //função que transforma horas em minutos para usar no horário de inicio e término das aulas

  const [hour, minutes] = time.split(':').map(Number)

  const timeInMinutes = (hour * 60) + minutes

  return timeInMinutes
}