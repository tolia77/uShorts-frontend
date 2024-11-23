import ErrorComponent from "./ErrorComponent";

export default function Forbidden() {
    return <ErrorComponent status="403" text="Forbidden" />
}