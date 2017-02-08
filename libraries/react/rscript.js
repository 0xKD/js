(function() {
  // Component names must begin with uppercase letter
  var Comment = React.createClass({
    render: function() {
      return (
        <div className="comment">
          <h3 className="author">
            {this.props.author}
          </h3>
          {this.props.children}
        </div>
      );
    }
  });

  var CommentList = React.createClass({
    render: function() {
      var commentNodes = this.props.data.map(function(c) {
        return (
          <Comment author={c.author}>
            {c.text}
          </Comment>
        );
      });
      return (
        <div className="commentList">
          {commentNodes}
        </div>
      );
    }
  });

  var CommentForm = React.createClass({
    handleSubmit: function(e) {
      e.preventDefault();
      var author = ReactDOM.findDOMNode(this.refs.author).value.trim();
      var comment = ReactDOM.findDOMNode(this.refs.comment).value.trim();
      if (!author || !comment) { return; }
      // Call callback specified by parent component
      this.props.onCommentSubmit({author: author, text: comment});
      ReactDOM.findDOMNode(this.refs.author).value = '';
      ReactDOM.findDOMNode(this.refs.comment).value = '';
      return;
    },
    render: function() {
      // HTML attributes such as class / for must be replaced by
      // className and forName (because they are JS-reserved keywords?)
      return (
        <div className="commentForm">
          <div className="row">
            <div className="col-md-4 col-xs-12">
              <form action="#" role="form" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label forName="">Author</label>
                  <input type="text" ref="author" className="form-control" placeholder="John Doe"/>
                </div>
                <div className="form-group">
                  <label forName="">Comment</label>
                  <textarea type="text" ref="comment" className="form-control" placeholder="Here's my opinion"></textarea>
                </div>
                <button className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      );
    }
  });

  var CommentBox = React.createClass({
    getInitialState: function() {
      return {data: this.props.data};
    },
    handleCommentSubmit: function(data) {
      var comments = this.state.data;
      console.log('[+] old:' + JSON.stringify(comments));
      var newComments = comments.concat([data]);
      console.log('[+] new:' + JSON.stringify(newComments));
      this.setState({data: newComments});
    },
    render: function() {
      // You need to self-close tags 
      // (even if you don't need to do the same in HTML, eg; <br> <img>)
      // JS comments not allowed within JSX tags
      return (
        <div className="commentBox">
          <h2>Comments</h2>
          <hr/>
          <CommentList data={this.state.data}/>
          <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
        </div>
      );
    }
  });

  var data = [
    {author: "Pete Hunt", text: "This is one comment"},
    {author: "Jordan Walke", text: "This is *another* comment"}
  ];
  // Fatal fail if ID specified below is not found
  ReactDOM.render(
    <CommentBox data={data}/>,
    document.getElementById('comments')
  );
}());
