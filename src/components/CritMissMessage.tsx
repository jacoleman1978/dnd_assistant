import { WhoTableCritted } from "../staticData/interfaces";

interface CritMissMessageProps {
    crit: WhoTableCritted;
    index?: number;
}

const CritMissMessage = ({ crit, index = 0 }: CritMissMessageProps) => {
    const secondIndexExclam: number = crit.critMessage.indexOf(
        "!",
        crit.critMessage.indexOf("!") + 1
    );
    const firstRollMessage: string = crit.critMessage.slice(
        0,
        secondIndexExclam + 1
    );

    const critMessage: string = crit.critMessage.slice(secondIndexExclam + 1);
    const critDescriptionIndex: number = critMessage.indexOf("Description:");
    const secondRollMessage: string = critMessage.slice(
        0,
        critDescriptionIndex
    );
    const critEffectIndex: number = critMessage.indexOf("Effect:");
    const critDescription: string = critMessage.slice(
        critDescriptionIndex,
        critEffectIndex
    );
    const critEffect: string = critMessage.slice(critEffectIndex);
    return (
        <>
            <p
                className="group-roll-stats-section sm-margin-left"
                style={{
                    marginTop: index > 0 ? "20px" : 0,
                }}
                key={crit.identity}
            >
                {`${crit.identity}: ${firstRollMessage}`}
            </p>
            <p className="crit-message-stats-section">{`${secondRollMessage}`}</p>
            <p className="crit-message-stats-section vsm-margin-top">{`${critDescription}`}</p>
            <p className="crit-message-stats-section vsm-margin-top">{`${critEffect}`}</p>
        </>
    );
};
export default CritMissMessage;
