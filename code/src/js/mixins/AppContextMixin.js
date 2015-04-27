var AppContextMixin = {
    contextTypes: {
        user: React.PropTypes.object,
    },

    getUser: function() {
        return this.context.user;
    },

};

module.exports = AppContextMixin;
