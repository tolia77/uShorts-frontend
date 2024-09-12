import {errorsToArray} from "../../utils/responseHelpers";

export default function UnprocessableEntity({errors}) {
    let arr = errorsToArray(errors).map(err =>
        <div className="error">
            <p>{err}</p>
        </div>
    )
    return (
        <div id="errors">
            {arr}
        </div>
    )
}