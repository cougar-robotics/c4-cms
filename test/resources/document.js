exports.behavior = function() {
    it('has a title', function() {
        this.doc.should.have.property('title', 'This is a Title');
    });
    xit('has an author');
    it('has a content field', function() {
        this.doc.should.have.property('content', 'This is the content. It may be rather long.');
    });
};
