import { TinderCatPage } from './app.po';

describe('tinder-cat App', () => {
  let page: TinderCatPage;

  beforeEach(() => {
    page = new TinderCatPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
