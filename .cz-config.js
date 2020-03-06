module.exports = {
    types: [
      {
        value: 'build',
        name: 'build:     A build' 
      },
      {
        value: 'chore',
        name: 'chore:     Changes to the build process or auxiliary tools\n             and libraries such as documentation generation',
      },
      { 
        value:'docs',
        name: 'docs:      Documentation only changes'
      },
      {
        value: 'feat',
        name: 'feat:      A new feature'
      },
      {
        value: 'fix',
        name: 'fix:       A bug fix'
      },
      {
        value: 'major',
        name: 'major:     A breaking change'
      },
      {
        value: 'minor',
        name: 'minor:     A minor change'
      },
      {
        value: 'patch',
        name: 'patch:     A patch'
      },
      {
        value: 'perf',
        name: 'perf:      A code change that improves performance'
      },
      {
        value: 'refactor',
        name: 'refactor:  A code change that neither fixes a bug nor adds a feature',
      },
      {
        value: 'revert',
        name: 'revert:    Revert to a commit'
      },
      {
        value: 'style',
        name: 'style:     Changes that do not affect the meaning of the code\n             (white-space, formatting, missing semi-colons, etc)',
      },
      {
        value: 'test',
        name: 'test:      Adding missing tests'
      },
      {
        value: 'wip',
        name: 'wip:       Work in progress'
      }
    ],
    
    allowTicketNumber: true,
    isTicketNumberRequired: false,
    ticketNumberPrefix: 'ticket-',
    ticketNumberRegExp: '\\d{1,5}',
  
    // it needs to match the value for field type. Eg.: 'fix'
    /*
    scopeOverrides: {
      fix: [
  
        {name: 'merge'},
        {name: 'style'},
        {name: 'uiTest'},
        {name: 'unitTest'}
      ]
    },
    */
    messages: {
      type: "Select the TYPE of change that you're committing:",
      customScope: 'Denote the SCOPE of this change (optional):',
      subject: 'Write a SHORT, IMPERATIVE tense description of the change:\n',
      body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
      breaking: 'List any BREAKING CHANGES (optional):\n',
      footer: 'List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n',
      confirmCommit: 'Are you sure you want to proceed with the commit above?',
    },
  
    allowCustomScopes: true,
    allowBreakingChanges: ['major'],
    // skipQuestions: ['body'],
    subjectLimit: 100,
  };