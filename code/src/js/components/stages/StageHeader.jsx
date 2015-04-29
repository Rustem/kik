var Router = require('react-router');
var Link = Router.Link;
var UserActions = require('../../actions/UserActions');
var AppContextMixin = require('../../mixins/AppContextMixin');

var StageHeader = React.createClass({
    mixins: [AppContextMixin, Router.Navigation],

    onLogout: function() {
        var promise = UserActions.logout(undefined);
        promise.done(function() {
            this.transitionTo('index');
            
        }.bind(this));
    },

    getHeaderText: function() {
        var current_user = this.getUser();
        if (!current_user) {
           this.transitionTo('index');
        } else 
            switch(current_user.position) {
                case 0:
                    return 'Создание заявление'
                case 1:
                    return 'Согласование'
                case 20:
                    return 'Управление риск-менеджмента'
                case 21:
                    return 'Юридическое управление'
                case 22:
                    return 'Управление службы безопасности и режима'
                case 3:
                    return 'Арендный комитет'
        }
    },

    render: function() {
        var current_user = this.getUser();
        return (
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header" style={{padding:'5px'}}>
                        <Link to="index">
                            <img src="http://kmc.kz/uploads/settings/537c680011584.png" alt="Казахстанская ипотечная компания" height="60" />
                        </Link>
                    </div>
                    <p className="navbar-text lead" style={{marginTop:'20px'}}>
                        {this.getHeaderText()}
                    </p>
                    <p className="navbar-text navbar-right">
                        <button type="button" className="btn btn-default navbar-btn" onClick={this.onLogout}>
                            Выйти
                        </button>
                    </p>
                    <p className="navbar-text navbar-right" style={{marginTop:'30px'}}>
                        {current_user.lastname}
                    </p>
                </div>
            </nav>
        )
    }
});

module.exports = StageHeader;