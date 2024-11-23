import ErrorComponent from "./ErrorComponent";

export default function Forbidden() {
    return <ErrorComponent status="404" text="Not found" />
}