import {
  compile,
  execute,
  getCompiler,
  getErrors,
  getModuleSource,
  getWarnings,
  readAsset,
} from './helpers';

describe('loader', () => {
  it('should work', async () => {
    const compiler = getCompiler('simple-module-default.js', {
      expose: 'globalObject1',
    });
    const stats = await compile(compiler);

    expect(
      getModuleSource('./global-commonjs.js-exposed', stats)
    ).toMatchSnapshot('module');
    expect(
      execute(readAsset('main.bundle.js', compiler, stats))
    ).toMatchSnapshot('result');
    expect(getErrors(stats)).toMatchSnapshot('errors');
    expect(getWarnings(stats)).toMatchSnapshot('warnings');
  });

  it('should work with nested property', async () => {
    const compiler = getCompiler('simple-module-default.js', {
      expose: 'globalObject1.foo',
    });
    const stats = await compile(compiler);

    expect(
      getModuleSource('./global-commonjs.js-exposed', stats)
    ).toMatchSnapshot('module');
    expect(
      execute(readAsset('main.bundle.js', compiler, stats))
    ).toMatchSnapshot('result');
    expect(getErrors(stats)).toMatchSnapshot('errors');
    expect(getWarnings(stats)).toMatchSnapshot('warnings');
  });
});