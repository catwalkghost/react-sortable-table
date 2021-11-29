module.exports = {
    '*.{js,jsx}': ['eslint --fix'],
    '*.+(js|jsx|json|yml|yaml|css|less|scss|ts|tsx|md|graphql|mdx)': ['prettier --write'],
    '*.{png,jpeg,jpg,gif,svg}': ['imagemin-lint-staged']
};
