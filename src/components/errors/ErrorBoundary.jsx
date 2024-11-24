import React from 'react';
import Forbidden from "./Forbidden";
import NotFound from "./NotFound";

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: {}
        };
    }
    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error: error,
        };
    }

    componentDidCatch(error, errorInfo) {
        console.log(error);
    }

    render() {
        if (this.state.hasError) {
            if(this.state.error.response) {
                if(this.state.error.response.status === 403) {
                    return <Forbidden/>
                }
                else if(this.state.error.response.status === 404) {
                    return <NotFound/>
                }
                else if(this.state.error.response.status === 401 && this.state.error.response.data === "You need to log in") {
                    window.location.href = "/login"
                }
            }
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}