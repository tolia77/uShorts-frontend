export default function ErrorComponent({status, text}) {
    return (
        <div className={"error"}>
            <h1>{status}</h1>
            <p>{text}</p>
        </div>
    )
}