import { formatDistanceToNow, formatDistanceToNowStrict } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useContext } from "react"
import { CyclesContex } from "../../contexts/CyclesContext"
import { HistoryContainer, HistoryList, Status } from "./styles"

export function History() {
  const { cycles } = useContext(CyclesContex)
  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {cycles.map(cycle => {
              const formatedDate = formatDistanceToNow(
                new Date(cycle.startDate),
                {
                  addSuffix: true,
                  locale: ptBR
                }
              )

              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount} minutos</td>
                  <td>{formatedDate}</td>
                  <td>
                    {cycle.finishedDate && <Status statusColor="green">Concluído</Status>}
                    {cycle.interruptedDate && <Status statusColor="red">Interrompido</Status>}
                    {!cycle.finishedDate && !cycle.interruptedDate && <Status statusColor="yellow">Em andamento</Status>}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}