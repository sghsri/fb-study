import React, { Component } from 'react';
import { getImageURL } from '../util/util';
import '../css/post.css';


class SharePopup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            reasons: ['Nudity', 'Violence', 'Harrasment', 'Suicide or Self-Injury', 'False News', 'Spam', 'Unauthorized Sales', 'Hate Speech', 'Terrorism'],
            reason: ''
        };
    }

    reportButtonClick = (reason) => {
        if (reason) {
            this.setState({ reason: reason });
        }
    };

    render() {
        let { post } = this.props;
        return (<dialog>
            <div class="modal-mask">
                <div class="modal-wrap">
                    <div class="modal" id="modal">
                        <button class="modal__close" onClick={() => { this.props.toggleReport(); }}> <i class="i-close"></i></button>
                        <div class="modal__content">
                            <p className="post__content">
                                You can report this after selecting a problem. Please note we have fewer reviewers available right now.</p>
                            <div class="report-post-container">
                                {
                                    this.state.reasons.map((reason, index) => {
                                        return <button key={index} className={`report-post-button ${this.state.reason == reason ? 'report-post-button-selected' : ''}`}
                                            onClick={() => { this.reportButtonClick(reason); }}
                                        >{reason}</button>;

                                    })
                                }
                            </div>
                            <footer class="modal__footer">
                                <div>
                                    <button class="modal__button modal__button--undo" onClick={() => { this.props.toggleReport(); }}>Undo</button>
                                    <button class="modal__button modal__button--done" onClick={() => { this.props.reportPost(post.post_id, this.state.reason); }}>Report</button>
                                </div >
                            </footer >
                        </div >
                    </div >
                </div >
            </div >
        </dialog >);
    }
}

export default SharePopup;