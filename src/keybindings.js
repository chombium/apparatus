'use strict'

// const moduleValidation = require('./moduleValidation.js')
const searchAttribute = require('./searchAttribute.js')
const printChat = require('./printChat.js')
const totalNodes = require('./totalNodes.js')

module.exports = function keyboard (cy, toggleUI) {
  // help menu
  const helpMenu = `• help: for options\n
  • validate: to validate module\n
  • alt + e: add an edge\n
  • backspace: delete node/edge\n
  • alt + h: toggle UI\n
  • meta + l: focus on console\n
  • search for attributes\n`

  const consoleId = document.getElementById('console-id')

  let selectedNode = ''
  cy.on('tap', 'node', (selection) => {
    selectedNode = selection.target[0]
    selectedEdge = ''
  })
  let selectedEdge = ''
  cy.on('tap', 'edge', (selection) => {
    selectedEdge = selection.target[0]
    selectedNode = ''
  })
  // empties the selection values when clicking the graph
  cy.on('tap', (selection) => {
    if (selection.target === cy) {
      selectedEdge = ''
      selectedNode = ''
    }
  })

  document.addEventListener('keydown', (event) => {
    // focus on console
    if (event.metaKey === true && event.code === 'KeyL') {
      consoleId.focus()
    }
    // toggle UI
    if (event.altKey === true && event.code === 'KeyH') {
      toggleUI()
    }
    // Backspace deletion of nodes and edges
    // Fix it: when the selection is empty, it logs an error
    if (event.code === 'Backspace') {
      if (selectedNode === '') {
        selectedEdge.remove()
      }
      if (selectedEdge === '') {
        selectedNode.remove()
      }
      totalNodes(cy)
    }
    // console commands
    const input = document.getElementById('console-id').value
    // listens for you to press the ENTER key
    if (document.activeElement === consoleId && event.code === 'Enter') {
      document.getElementById('console-id').value = ''
      if (input === 'help' || input === 'options') {
        printChat(helpMenu)
      } else if (input === 'validate') {
        // moduleValidation(s)
        printChat('not implemented')
      } else if (input === '') {
        printChat('not valid command')
      } else if (input === 'clear') {
        document.getElementById('info-nodes-id').textContent = ''
      } else {
        searchAttribute(cy, input)
      }
      // else {
      //   document.getElementById('info-for-nodes-id').textContent = 'not valid command'
      // }
    }
  })
}