module.exports = {
    format_date: (date) => {
        return date.toLocaleDateString();
    },
    format_amount: (amount) => {
        return parse(amount).toLocaleDateString();
    },
    is_my_page:(pageUser, userId) => {
        return pageUser ===userId;
    }

};
