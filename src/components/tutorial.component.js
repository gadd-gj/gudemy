import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";

class Tutorial extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.updatePublished = this.updatePublished.bind(this);
        this.updateTutorial = this.updateTutorial.bind(this);
        this.deleteTutorial = this.deleteTutorial.bind(this);

        this.state = {
            currentTutorial: {
                id: null,
                title: "",
                description: "",
                published: false,
                fileurl: ""
            },
            message: "",
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { tutorial } = nextProps;
        if (prevState.currentTutorial.id !== tutorial.id) {
            return {
                currentTutorial: tutorial,
                message: ""
            };
        }

        return prevState.currentTutorial;
    }

    componentDidMount() {
        this.setState({
            currentTutorial: this.props.tutorial,
        });
    }

    onChangeTitle(e) {
        const title = e.target.value;

        this.setState(function (prevState) {
            return {
                currentTutorial: {
                    ...prevState.currentTutorial,
                    title: title,
                },
            };
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState((prevState) => ({
            currentTutorial: {
                ...prevState.currentTutorial,
                description: description,
            },
        }));
    }

    updatePublished(status) {
        TutorialDataService.update(this.state.currentTutorial.id, {
            published: status,
        })
            .then(() => {
                this.setState((prevState) => ({
                    currentTutorial: {
                        ...prevState.currentTutorial,
                        published: status,
                    },
                    message: "The status was updated successfully!",
                }));
            })
            .catch((e) => {
                console.log(e);
            });
    }

    updateTutorial() {
        const data = {
            title: this.state.currentTutorial.title,
            description: this.state.currentTutorial.description,
        };

        TutorialDataService.update(this.state.currentTutorial.id, data)
            .then(() => {
                this.setState({
                    message: "The tutorial was updated successfully!",
                });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    deleteTutorial() {
        TutorialDataService.delete(this.state.currentTutorial.id)
            .then(() => {
                this.props.refreshList();
            })
            .catch((e) => {
                console.log(e);
            });
    }

    render() {
        const { currentTutorial } = this.state;

        return (
            <div className="container">
                <h4>Tutorial</h4>
                {currentTutorial ? (
                    <div className="edit-form ">

                        <div className="container">
                            <div className="" >
                                <video className="img-fluid" src={currentTutorial.fileurl} alt="" width="720" height="440" controls />
                            </div>
                        </div>

                        <form className="float-left">
                            <div className="form-group row">
                                <label htmlFor="title">Titulo</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={currentTutorial.title}
                                    onChange={this.onChangeTitle}
                                />
                            </div>
                            <div className="form-group row" >
                                <label htmlFor="description">Descripción del video</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    value={currentTutorial.description}
                                    onChange={this.onChangeDescription}
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    <strong>Status:</strong>
                                </label>
                                {currentTutorial.published ? "Published" : "Pending"}
                            </div>
                        </form>
                        <div className="float-right">
                            {currentTutorial.published ? (
                                <button
                                    className="badge badge-primary mr-2"
                                    onClick={() => this.updatePublished(false)}
                                >
                                    UnPublish
                                </button>
                            ) : (
                                <button
                                    className="badge badge-primary mr-2"
                                    onClick={() => this.updatePublished(true)}
                                >
                                    Publish
                                </button>
                            )}



                            <button className="badge badge-danger mr-2" onClick={this.deleteTutorial} >
                                Delete
                            </button>
                            <button type="submit" className="badge badge-success"
                                    onClick={this.updateTutorial} >
                                Update
                            </button>

                        </div>

                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Haz clic en un video</p>
                    </div>
                )}
            </div>
        );
    }
}

export default Tutorial;