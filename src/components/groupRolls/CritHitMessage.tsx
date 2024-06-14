import { WhoTableCritted } from "../../staticData/interfaces";

interface CritHitMessageProps {
    crit: WhoTableCritted;
    index?: number;
}

/**
 * A message for displaying the critical hit message.
 * @param crit The object of the player who rolled a critical hit
 * @param index The index of the player in the array of critical hits
 */
const CritHitMessage = ({ crit, index = 0 }: CritHitMessageProps) => {
    const firstIndex: number = crit.critMessage.indexOf(":");
    const rollOnTable: string = crit.critMessage.slice(0, firstIndex + 2);
    const critMessage: string = crit.critMessage.slice(firstIndex + 2);
    return (
        <div>
            <p
                className="group-roll-stats-section sm-margin-left"
                style={{
                    marginTop: index > 0 ? "20px" : 0,
                }}
                key={crit.identity}
            >
                {`${crit.identity}: ${rollOnTable}`}
            </p>
            <p className="crit-message-stats-section">{`${critMessage}`}</p>
        </div>
    );
};
export default CritHitMessage;
