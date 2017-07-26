import { SimplenotebookClientPage } from './app.po';

describe('simplenotebook-client App', () => {
  let page: SimplenotebookClientPage;

  beforeEach(() => {
    page = new SimplenotebookClientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
