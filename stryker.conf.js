module.exports = config => {
  config.set({
    files: [
      {
        pattern: 'src/**/*.js',
        mutated: true,
        included: true
      },
      'test/**/*.js'
    ],
    testRunner: 'mocha',
    mutator: 'javascript',
    transpilers: [],
    reporter: ['html', 'clear-text', 'progress'],
    testFramework: 'mocha',
    coverageAnalysis: 'perTest'
  })
}
