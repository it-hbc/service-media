var mongoose = require('mongoose');

var mediaSchema = new mongoose.Schema({
    // userName by default will be ''
    file_name: { type: String, required: true },
    account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    // when creating a user, an email is required
    file_id: { type: String, required: true },
    url: { type: String, required: true},
    path: { type: String, required: true },
    // a user must also have a password
    status: { type: String, required: true, default: 'started' },
    created_at: Date,
    updated_at: Date
});

var accountSchema = new mongoose.Schema({
    username: String,
    created_at: Date,
    updated_at: Date
});
mediaSchema.pre('save', set_dates);
accountSchema.pre('save', set_dates);
function set_dates(next){
    this.updated_at = Date.now();
    if (!this.created_at) {
        this.created_at = Date.now();
    }
    next();
}
var Media = mongoose.model('Media', mediaSchema);
var Account = mongoose.model('Account', accountSchema);
module.exports = {
    'Media': Media,
    'Account': Account
};
