import React, { Component } from "react";
//import {useState} from 'react'
import { storage } from "../firebase";

import TutorialDataService from "../services/tutorial.service";


class AddTutorial extends Component {

    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.saveTutorial = this.saveTutorial.bind(this);
        this.newTutorial = this.newTutorial.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);


        this.state = {
            title: "",
            description: "",
            published: false,

            submitted: false,
            file: "",
            name: "",
            fileurl: ""

        };

    }

    /* storage */


    onChangeTitle(e) {
        this.setState({
            title: e.target.value,
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value,
        });
    }

    saveTutorial() {
        let data = {
            title: this.state.title,
            description: this.state.description,
            published: false,
            fileurl: this.state.fileurl
        };

        TutorialDataService.create(data)
            .then(() => {
                console.log("Created new item successfully!");
                this.setState({
                    submitted: true,
                });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    newTutorial() {
        this.setState({
            title: "",
            description: "",
            published: false,

            submitted: false,
        });
    }

    handleChange(e) {
        alert("e: " + e.target.files[0]);
        alert("e: " + e.target.files[0].name);

        this.setState({
            file: e.target.files[0],
            name: e.target.files[0].name
        });
    }

    handleUpload(e) {
        let myname = this.state.name;
        alert("uploading..." + myname);
        e.preventDefault();
        const uploadTask = storage.ref(`/videos/${this.state.name}`).put(this.state.file);
        uploadTask.on("state_changed", console.log, console.error, () => {
            storage
                .ref("videos")
                .child(this.state.name)
                .getDownloadURL()
                .then((url) => {
                    //this.setFile(null);
                    this.setState({ fileurl: url });
                });
        });
    }


    render() {

        return (


            <div className="container-fluid">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newTutorial}>
                            Añadir
                        </button>
                    </div>
                ) : (
                    <div className="container col-lg-6 text-center">
                        <div className="form-group">
                            <label htmlFor="title">Titulo</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                required
                                value={this.state.title}
                                onChange={this.onChangeTitle}
                                name="title"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Descripción</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                required
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                name="description"
                            />
                        </div>

                        <div className="form-group">
                            <button onClick={this.saveTutorial} className="btn btn-success">
                                Guardar
                            </button>
                        </div>

                    </div>
                )}

                <div className="App">

                    <form onSubmit={this.handleUpload}>

                        <div className="form-group text-center">
                            <input type="file" onChange={this.handleChange} />
                            <button className="btn btn-primary">Subir video</button>
                        </div>

                    </form>

                    <div className="text-center">
                        <video src={this.state.fileurl} width="720" height="440" controls alt="" />
                    </div>

                </div>

            </div>
        );
    }
}

export default AddTutorial;