import React, { Component } from 'react';
import '../css/fb.css';
import Post from './Post';
import config from '../config';
import firebase from 'firebase';
import ArticleModal from './ArticleModal';
import app from "../util/firebase.js";
import SharePopup from "./SharePopup";
import ReportPopup from "./ReportPopup";
import Logger from '../logging/Logger';

class FFacebook extends Component {

  constructor(props) {
    super(props);
    this.state = {
      static: {},
      settings: {},
      articleToShow: null,
      postToShare: null,
      postToReport: null,
    };

    let user_id = localStorage.getItem('user_id');
    let ip_address = localStorage.getItem('ip_address');
    // console.log(user_id, ip_address);
    if (!user_id || !ip_address) {
      localStorage.setItem("user_id", Math.random().toString(36).substr(2, 9));
      fetch('https://api.ipify.org/?format=json').then(resp => {
        return resp.json();
      }).then(resp => {
        localStorage.setItem("ip_address", resp.ip);
      });
    }
  }


  getUserObject = (user_id) => {
    return this.state.static.users.find(user => user_id === user.user_id);
  };

  toggleArticle = (article_id = null) => {
    let article = article_id;
    if (article) {
      article = this.state.static.articles.find(art => article === art.article_id);
    }
    this.setState({ articleToShow: article }, () => {
      if (this.state.articleToShow) {
        Logger.log_action('click', 'open article', this.state.articleToShow);
      } else {
        Logger.log_action('click', 'close article', this.state.articleToShow);
      }
    });
  };

  sharePost = (post_id, undo = false) => {
    Logger.log_action('share', undo ? 'undo post shared' : 'post shared', this.state.postToShare);
    let post = this.state.static.posts.find(p => post_id === p.post_id);
    if (post) {
      post.is_shared = !undo;
    }
    this.setState({ static: this.state.static, postToShare: null });
    // this.toggleShare();
  };





  toggleShare = (post_id = null) => {
    let post = post_id;
    if (post != null) {
      post = this.state.static.posts.find(p => post === p.post_id);
    }
    this.setState({ postToShare: post }, () => {
      if (this.state.postToShare) {
        Logger.log_action('click', 'open share', this.state.postToShare);
      } else {
        Logger.log_action('click', 'close share', this.state.postToShare);
      }
    });
  };

  toggleReport = (post_id = null) => {
    let post = post_id;
    if (post != null) {
      post = this.state.static.posts.find(p => post === p.post_id);
    }
    this.setState({ postToReport: post }, () => {
      if (this.state.postToReport) {
        Logger.log_action('click', 'open report', this.state.postToReport);
      } else {
        Logger.log_action('click', 'close report', this.state.postToReport);
      }
    });
  };

  reportPost = (post_id) => {
    Logger.log_action('report', 'post reported', this.state.postToReport);
    let post = this.state.static.posts.find(p => post_id === p.post_id);
    if (post) {
      post.is_reported = true;
    }
    this.setState({ static: this.state.static, postToReport: null });
  };

  async componentDidMount() {
    try {
      let static_data = await (await firebase.database().ref(`static`).once('value')).val();
      let settings = await (await firebase.database().ref(`settings`).once('value')).val();

      if (settings.random_posts) {
        static_data.posts = static_data.posts.sort(() => Math.random() - 0.5);
      }

      this.setState({ static: static_data, settings: settings });
    } catch (e) {
      console.log(e);
    } finally {
      // do the error handling here
    }
  }

  hidePost = (post_id) => {
    console.log('hide post');
    let post = this.state.static.posts.find(p => post_id === p.post_id);
    if (post) {
      Logger.log_action('hide', 'post hidden', post);
      post.is_hidden = true;
      console.log(post);
      this.setState({ static: this.state.static });
    }
  };

  render() {
    return (
      <div id="app">
        <div class="site-header">
        </div>
        <div>
          {this.state.static.posts && this.state.static.posts.map((post, index) => {
            if (!post.is_hidden)
              return <Post
                post={post} key={index}
                getUserObj={this.getUserObject}
                toggleArticle={this.toggleArticle}
                toggleShare={this.toggleShare}
                sharePost={this.sharePost}
                hidePost={this.hidePost}
                toggleReport={this.toggleReport}
              />;
          })}
        </div>

        {this.state.articleToShow &&
          <ArticleModal article={this.state.articleToShow} toggleArticle={this.toggleArticle}></ArticleModal>
        }
        {this.state.postToShare &&
          <SharePopup post={this.state.postToShare} toggleShare={this.toggleShare} sharePost={this.sharePost}></SharePopup>
        }
        {this.state.postToReport &&
          <ReportPopup post={this.state.postToReport} toggleReport={this.toggleReport} reportPost={this.reportPost}></ReportPopup>
        }
      </div>
    );
  }
}

export default FFacebook;