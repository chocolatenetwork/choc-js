// pm2 config for substrate
// Reason: To start and stop all relays and parachain collators at once.

/**
 * @type {import('pm2').StartOptions[]}
 */
const apps = [
  {
    interpreter: '/usr/bin/bash',
    script: './tools/scripts/start-collator.sh',
    name: 'parachain-collator',
  },
  {
    interpreter: '/usr/bin/bash',
    script: './tools/scripts/start-relay.sh',
    args: 'alice',
    name: 'relay-alice',
  },
  {
    interpreter: '/usr/bin/bash',
    script: './tools/scripts/start-relay.sh',
    args: 'bob',
    name: 'relay-bob',
  },
];

module.exports = {
  apps,
};
