
const localStorageMock = {
    storage: {},
    getItem: jest.fn((key) => localStorageMock.storage[key]),
    setItem: jest.fn((key, value) => localStorageMock.storage[key] = value),
};

global.localStorage = localStorageMock;
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});
