// Import the functions from your script file
import { validateEmail, validateName, loadNewDog } from '../script/index';



// Mocking fetch before the tests run
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ message: 'URL of the new dog image' }),
  })
);

describe('validateEmail', () => {
  test('should validate correct email', () => {
    expect(validateEmail('test@example.com')).toBe(true);
  });

  test('should invalidate incorrect email', () => {
    expect(validateEmail('not-an-email')).toBe(false);
  });
});

describe('validateName', () => {
  test('should validate correct name', () => {
    expect(validateName('John')).toBe(true);
  });

  test('should invalidate name that is too short', () => {
    expect(validateName('J')).toBe(false);
  });
});

describe('loadNewDog', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    fetch.mockClear();
    document.body.innerHTML = `
      <div id="dogImagesContainer">
        <img id="dog-image" src="default.jpg">
      </div>
    `;
  });

  test('should call fetch with the correct URL', async () => {
    await loadNewDog();
    expect(global.fetch).toHaveBeenCalledWith('https://dog.ceo/api/breeds/image/random');
  });

  test('should process the response and update the DOM accordingly', async () => {
    await loadNewDog();
    const dogImage = document.getElementById('dog-image');
    // Depending on how your loadNewDog function works, you may need to adjust the expected src
    expect(dogImage.src).toContain('URL of the new dog image');
  });
});
