import { SamLWeatherPage } from './app.po';

describe('sam-l-weather App', () => {
  let page: SamLWeatherPage;

  beforeEach(() => {
    page = new SamLWeatherPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
