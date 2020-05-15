import React, { Component } from 'react';

import '../css/article.css';


class ArticalModal extends Component {

    render() {
        return (<div class="browser-dialog">
            <div class="browser__control">
                <button class="browser__close" onClick={() => { this.props.toggleArticle(); }}> Return to Facebook<i class="i-close--white"></i></button>
            </div>
            <div class="browser-wrap frame" width="100%" height="100%">
                <header class="header article-container container--wide" role="banner">
                    <div class="site-title">{this.props.article.publication}</div>
                </header>
                <div className="article-container">
                    <div className="article-header">
                        <h2 className="article-title">{this.props.article.title}</h2>
                        <p class="byline">Posted on <time>{new Date().toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</time></p>
                    </div>
                    <hr></hr>
                    <div className="article">
                        <div dangerouslySetInnerHTML={{ __html: this.props.article.raw_html }} width="100%" height="100%" />
                    </div>
                </div>
                <footer class="colophon article-container container--wide">
                    <hr></hr>

                    <div class="article-row row--wide">
                        <p class="copyright center">This material may not be published, broadcast, rewritten, or redistributed.<br></br>©All Rights Reserved.</p>
                    </div>
                </footer>
            </div>
        </div>);
    }
}

export default ArticalModal;