/*
 * problems.js — all problem data, stored locally (no fetch needed, works on file://).
 * Source: "Juniors Phase 1 Practice #2 ( STL 1 )" PDF — 20 problems (A–T), original order.
 *
 * Fields: id, number, letter, title, limits{time,memory}, statement/input/output/constraints/notes (HTML),
 *         examples[{input, output, explanation?}], figure (HTML, optional), warnings[] (extraction notes),
 *         hints[3] (null = unavailable).
 */
const L = (...lines) => lines.join("\n");

/* Redrawn version of the histogram figure in problem R (heights taken from the statement). */
function histogramSvg(highlight) {
  const h = [2, 1, 4, 5, 1, 3, 3], w = 30, u = 26, base = 150, x0 = 8;
  let s = '<svg viewBox="0 0 ' + (x0 * 2 + h.length * w) + ' 166" role="img" aria-label="Histogram with heights 2, 1, 4, 5, 1, 3, 3">';
  s += '<defs><pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="6" stroke="currentColor" stroke-width="2"/></pattern></defs>';
  h.forEach((v, i) => {
    s += '<rect x="' + (x0 + i * w) + '" y="' + (base - v * u) + '" width="' + w + '" height="' + (v * u) +
         '" fill="none" stroke="currentColor" stroke-width="1.5"/>';
  });
  if (highlight) {
    s += '<rect x="' + (x0 + 2 * w) + '" y="' + (base - 4 * u) + '" width="' + (2 * w) + '" height="' + (4 * u) +
         '" fill="url(#hatch)" stroke="currentColor" stroke-width="1.5"/>';
  }
  s += '<line x1="' + x0 + '" y1="' + base + '" x2="' + (x0 + h.length * w) + '" y2="' + base + '" stroke="currentColor" stroke-width="2"/>';
  s += '</svg>';
  return s;
}

const problems = [
  /* ───────────── A ───────────── */
  {
    id: "problem-a", number: 1, letter: "A", title: "Regular Bracket Sequence",
    limits: { time: "5 seconds", memory: "256 megabytes" },
    statement: `
<p>A bracket sequence is called regular if it is possible to obtain correct arithmetic expression by inserting characters «+» and «1» into this sequence. For example, sequences «(())()», «()» and «(()(()))» are regular, while «)(», «(()» and «(()))(» are not.</p>
<p>One day Johnny got bracket sequence. He decided to remove some of the brackets from it in order to obtain a regular bracket sequence. What is the maximum length of a regular bracket sequence which can be obtained?</p>`,
    input: `<p>Input consists of a single line with non-empty string of «(» and «)» characters. Its length does not exceed 10<sup>6</sup>.</p>`,
    output: `<p>Output the maximum possible length of a regular bracket sequence.</p>`,
    constraints: `<ul><li>Length of the string ≤ 10<sup>6</sup></li></ul>`,
    examples: [
      { input: L("(()))("), output: L("4") },
      { input: L("((()())"), output: L("6") }
    ],
    notes: "",
    warnings: ["The exponent of the length bound was detached in the PDF text. It was restored as 10<sup>6</sup> from the stray “6” left next to it."],
    hints: [
      "Try pairing brackets as you read the string from left to right. Some brackets will never find a partner.",
      "Keep track of how many opening brackets are still waiting for a partner. A closing bracket is only useful when at least one is waiting.",
      "Every successful pairing adds 2 to the answer, and the unmatched brackets are exactly the ones you remove. You only need to count pairs; you don't have to build the sequence."
    ]
  },

  /* ───────────── B ───────────── */
  {
    id: "problem-b", number: 2, letter: "B", title: "Tickets",
    limits: { time: "1 second", memory: "256 megabytes" },
    statement: `
<p>Nour is a big fan of Ahly football team. One day he went to the club to book a ticket for the next match. After he booked the ticket he waited for the bus to take him home, so he started playing a game with his friend. In one operation a person with ID enters the queue, or the one standing at the beginning of the queue books his ticket and leaves. Nour will guess the ID of the one who is leaving the queue, and for each guess, you have to tell whether he guessed correctly or not.</p>
<p><code>1 x</code> – means that person with ID <var>x</var> enters the queue.</p>
<p><code>2 x</code> – means that a person left the queue and Nour guessed that his ID is <var>x</var>.</p>
<p>Assume that Nour always guesses an ID that has already entered the queue and he will never guess unless there is at least one person in the queue and Nour guesses at least one time.</p>
<p>You have to tell Nour if he guesses right or wrong.</p>`,
    input: `
<p>The first Line of input contains one integer <var>n</var> (1 ≤ <var>n</var> ≤ 10<sup>5</sup>) the number of operations.</p>
<p>The next <var>n</var> lines contain two integers <var>a</var> and <var>b</var> (1 ≤ <var>a</var> ≤ 2), (1 ≤ <var>b</var> ≤ 10<sup>6</sup>), the type of the operation and the ID.</p>`,
    output: `<p>When Nour guesses tell him "Yes" if he guesses right, "No" if he guesses wrong in a single line.</p>`,
    constraints: `<ul><li>1 ≤ <var>n</var> ≤ 10<sup>5</sup></li><li>1 ≤ <var>a</var> ≤ 2</li><li>1 ≤ <var>b</var> ≤ 10<sup>6</sup></li></ul>`,
    examples: [
      { input: L("5", "1 10", "1 20", "2 20", "1 30", "2 20"), output: L("No", "Yes") },
      { input: L("7", "1 20", "2 20", "1 30", "1 10", "1 50", "2 30", "2 50"), output: L("Yes", "Yes", "No") }
    ],
    notes: "",
    warnings: [
      "Math symbols (<code>1 x</code>, <code>2 x</code>, <var>n</var>, <var>a</var>, <var>b</var>) were detached from their sentences in the PDF text. They were put back using the surrounding wording and the “n a b” input description.",
      "Exponents (10<sup>5</sup>, 10<sup>6</sup>) were re-attached from stray digits next to the bounds."
    ],
    hints: [
      "Who is the only person that can leave the line at any moment?",
      "A queue releases people in the order they arrived. Every type-2 operation removes whoever is at the front, whether or not Nour guessed correctly.",
      "Keep the current line in memory. For each type-2 operation, compare the guess with the person at the front, print the answer, and then remove that front person (they leave even if the guess was wrong)."
    ]
  },

  /* ───────────── C ───────────── */
  {
    id: "problem-c", number: 3, letter: "C", title: "Study INTRO!",
    limits: { time: "2 seconds", memory: "256 megabytes" },
    statement: `
<p>Students of FCIS-ASU are going to start the Intro course final exam. Zulaa is a big cheater so he decided to make a program that will help him in the exam. One of the most difficult questions in the exam is to write an HTML script, but Zulaa was too lazy to study HTML scripts and tags so the program he wanted to create should solve this question.</p>
<p>He tried a lot but he failed so he asked for your help. He asked you to make a program that will take the tags sequence and you should validate this script. As you know a script is valid if it contains only one Header tag and it should be the first tag in the script as well as the EndHeader should be the last tag in the script. Also in a valid script, every tag should be closed in a right manner, look at notes for more clarification.</p>`,
    input: `
<p>In the first line of the input you will be given an integer <var>n</var> (1 ≤ <var>n</var> ≤ 10<sup>5</sup>), followed by <var>n</var> lines each line contain tag.</p>
<p>Start tags are {"Header", "Row", "Cell", "Table"} while end tags are {"EndHeader", "EndRow", "EndCell", "EndTable"}.</p>
<p>Each start tag is ended by the same tag but an "End" precedes it.</p>`,
    output: `<p>The output should contain only one word "ACC" without quotes if the script is valid and "WA" otherwise.</p>`,
    constraints: `<ul><li>1 ≤ <var>n</var> ≤ 10<sup>5</sup></li></ul>`,
    examples: [
      { input: L("8", "Header", "Cell", "Row", "Table", "EndTable", "EndRow", "EndCell", "EndHeader"), output: L("ACC") }
    ],
    notes: `
<p><b>Valid script:</b></p>
<pre>${L("Header", "Row", "EndRow", "Cell", "EndCell", "Table", "EndTable", "Cell", "Row", "EndRow", "EndCell", "EndHeader")}</pre>
<p><b>Invalid script:</b></p>
<pre>${L("Header", "Row", "EndRow", "Cell", "EndCell", "Table", "EndTable", "Cell", "Row", "EndCell", "EndRow", "EndHeader")}</pre>`,
    warnings: [
      "The labels “Valid script” and “Invalid script” appeared after the two scripts in the PDF text, so their placement was lost. They were assigned by checking which script is correctly nested (the second one closes <code>EndCell</code> before <code>EndRow</code>, so it is invalid).",
      "The exponent in the bound on <var>n</var> was re-attached from a stray “5”."
    ],
    hints: [
      "When a tag is closed, which earlier tag is it allowed to close?",
      "Only the most recently opened tag that is still open may be closed next. Also think about where Header and EndHeader are allowed to appear.",
      "Remember the open tags in the order they were opened and check every end tag against the newest one. Besides correct nesting, the whole script must be wrapped by one Header … EndHeader pair, so the header can't close early and nothing may stay open at the end."
    ]
  },

  /* ───────────── D ───────────── */
  {
    id: "problem-d", number: 4, letter: "D", title: "Card Game",
    limits: { time: "0.25 seconds", memory: "5 megabytes" },
    statement: `
<p>Muhammad, Ali and Rady are playing Card Game for Three, as below:</p>
<ul>
<li>At first, each of the three players has a deck consisting of some number of cards. Each card has a letter <code>′m′</code>, <code>′a′</code> or <code>′r′</code> written on it. The orders of the cards in the decks cannot be rearranged.</li>
<li>The players take turns. Muhammad goes first.</li>
<li>If the current player's deck contains at least one card, discard the top card in the deck. Then, the player whose name begins with the letter on the discarded card, takes the next turn. (For example, if the card says <code>′m′</code>, Muhammad takes the next turn.)</li>
<li>If the current player's deck is empty, the game ends and the current player wins the game.</li>
</ul>
<p>You are given the initial decks of the players. More specifically, you are given three strings <var>S<sub>M</sub></var>, <var>S<sub>A</sub></var> and <var>S<sub>R</sub></var>. The <var>i</var>th (1 ≤ <var>i</var> ≤ |<var>S<sub>M</sub></var>|) letter in <var>S<sub>M</sub></var> is the letter on the <var>i</var>th card in Muhammad's initial deck. <var>S<sub>A</sub></var> and <var>S<sub>R</sub></var> describes Ali's and Rady's initial decks in the same way.</p>
<p>Determine the winner of the game.</p>`,
    input: `<p>The input consists of three lines containing three non-empty strings <var>S<sub>M</sub></var>, <var>S<sub>A</sub></var> and <var>S<sub>R</sub></var> (1 ≤ |<var>S</var>| ≤ 10<sup>5</sup>) — The initial decks of Muhammad, Ali and Rady respectively.</p>`,
    output: `<p>If Muhammad will win, print <code>M</code>. If Ali will win, print <code>A</code>. If Rady will win, print <code>R</code>.</p>`,
    constraints: `<ul><li>1 ≤ |<var>S</var>| ≤ 10<sup>5</sup> (each of the three strings)</li><li>Tight limits: 0.25 seconds, 5 megabytes</li></ul>`,
    examples: [
      {
        input: L("mrm", "mrrr", "rm"), output: L("M"),
        explanation: `
<p>Explanation of the first sample: The game will progress as below:</p>
<ul>
<li>Muhammad discards the top card in his deck, <code>′m′</code>. Muhammad takes the next turn.</li>
<li>Muhammad discards the top card in his deck, <code>′r′</code>. Rady takes the next turn.</li>
<li>Rady discards the top card in his deck, <code>′r′</code>. Rady takes the next turn.</li>
<li>Rady discards the top card in his deck, <code>′m′</code>. Muhammad takes the next turn.</li>
<li>Muhammad discards the top card in his deck, <code>′m′</code>. Muhammad takes the next turn.</li>
<li>Muhammad's deck is empty. The game ends and Muhammad wins the game.</li>
</ul>`
      },
      { input: L("mara", "mmra", "arrr"), output: L("R") }
    ],
    notes: "",
    warnings: [
      "Letters and symbols inside the sentences were detached in the PDF text. They were put back from context (the letters <code>′m′ ′a′ ′r′</code>, the names <var>S<sub>M</sub></var>, <var>S<sub>A</sub></var>, <var>S<sub>R</sub></var>, and the outputs M / A / R), and the letters in the sample explanation match the sample decks.",
      "The exponent in the bound was re-attached from a stray “5”."
    ],
    hints: [
      "Each deck is only ever read from the top, and the cards never get rearranged.",
      "You don't need to build new decks. Keep one position for each player and move it forward whenever that player discards a card.",
      "On every turn the current player either has no cards left (they win) or discards their next card, and that card's letter tells you whose turn is next. Every turn uses up one card, so the game must end."
    ]
  },

  /* ───────────── E ───────────── */
  {
    id: "problem-e", number: 5, letter: "E", title: "Plug-in",
    limits: { time: "1 second", memory: "256 megabytes" },
    statement: `
<p>Polycarp thinks about the meaning of life very often. He does this constantly, even when typing in the editor. Every time he starts brooding he can no longer fully concentrate and repeatedly presses the keys that need to be pressed only once. For example, instead of the phrase "how are you" he can type "hhoow aaaare yyoouu".</p>
<p>Polycarp decided to automate the process of correcting such errors. He decided to write a plug-in to the text editor that will remove pairs of identical consecutive letters (if there are any in the text). Of course, this is not exactly what Polycarp needs, but he's got to start from something!</p>
<p>Help Polycarp and write the main plug-in module. Your program should remove from a string all pairs of identical letters, which are consecutive. If after the removal there appear new pairs, the program should remove them as well. Technically, its work should be equivalent to the following: while the string contains a pair of consecutive identical letters, the pair should be deleted. Note that deleting of the consecutive identical letters can be done in any order, as any order leads to the same result.</p>`,
    input: `<p>The input data consists of a single line to be processed. The length of the line is from 1 to 2·10<sup>5</sup> characters inclusive. The string contains only lowercase Latin letters.</p>`,
    output: `<p>Print the given string after it is processed. It is guaranteed that the result will contain at least one character.</p>`,
    constraints: `<ul><li>1 ≤ length ≤ 2·10<sup>5</sup></li><li>Only lowercase Latin letters</li></ul>`,
    examples: [
      { input: L("hhoowaaaareyyoouu"), output: L("wre") },
      { input: L("reallazy"), output: L("rezy") },
      { input: L("abacabaabacabaa"), output: L("a") }
    ],
    notes: "",
    warnings: ["The exponent in “2·10<sup>5</sup>” was re-attached from a stray “5”."],
    hints: [
      "After deleting a pair, the letters on both sides of it may become neighbours.",
      "Read the string once from left to right and compare each new letter only with the letter your result currently ends with.",
      "Build the answer as you go: if the new letter equals the last kept letter, the pair disappears (drop the last kept letter); otherwise keep the new letter. You only ever touch the end of the result."
    ]
  },

  /* ───────────── F ───────────── */
  {
    id: "problem-f", number: 6, letter: "F", title: "New keyboard",
    limits: { time: "1 second", memory: "256 megabytes" },
    statement: `
<p>My father has bought a new keyboard and like any child, I started playing with this keyboard.</p>
<p>the new keyboard consists of Keys uppercase letters, lowercase letters, underscores, and two special characters '[' and ']' where ( '[' means the Home key,']' means the "End" key).</p>
<p>you should know that if I press the "Home key" the indicator moves to the beginning of the line, and if I press the "End key" the indicator moves to the end of the line, and if I press any other key the letter of this key will be printed in the position of the indicator on the monitor.</p>
<p>I started to make a string by pressing some keys on the keyboard, If I gave you these keys that I pressed, could you show me the real string that will appear on the monitor!!</p>`,
    input: `<p>There are several test cases the number of them is between 1 and 5.</p>
<p>Each test case containing a string <var>S</var> represents the keys that I pressed in the same order that I pressed them, (1 ≤ |<var>S</var>| ≤ 10<sup>5</sup>), and consists of uppercase letters, lowercase letters, underscores and two special characters '[' and ']'.</p>`,
    output: `<p>For each test case, print the real string that will appear on the monitor.</p>`,
    constraints: `<ul><li>Number of test cases: between 1 and 5</li><li>1 ≤ |<var>S</var>| ≤ 10<sup>5</sup></li></ul>`,
    examples: [
      { input: L("Name[My_]_Is_Mohemd", "[[]][][]I_Am_FrOm_AssiUt"), output: L("My_Name_Is_Mohemd", "I_Am_FrOm_AssiUt") }
    ],
    notes: "",
    warnings: [
      "The symbol <var>S</var> and its bound (1 ≤ |<var>S</var>| ≤ 10<sup>5</sup>) were detached from the input sentence. They were placed where the empty gaps appear in the text (“a string … them, , and consists of”); the exact position of the bound inside the sentence may differ from the original.",
      "The sample input has no test-case count line: each line is one test case."
    ],
    hints: [
      "Pressing Home doesn't erase anything. It only changes where the next letters go.",
      "Think of what you type as pieces of text: after Home, new text goes before everything typed earlier, until End is pressed.",
      "Inserting into the middle of a string one character at a time is too slow for 10^5 characters. Keep the text in separate groups (what belongs at the front and what belongs at the back) and join them once at the end, or use a structure with cheap insertion at both ends."
    ]
  },

  /* ───────────── G ───────────── */
  {
    id: "problem-g", number: 7, letter: "G", title: "Brackets (Hard Version)",
    limits: { time: "1 second", memory: "256 megabytes" },
    statement: `
<p>A string <var>S</var> consisting of <var>n</var> characters is called properly nested if:</p>
<ul>
<li><var>S</var> is empty.</li>
<li>or <var>S</var> has the form (<var>U</var>) where <var>U</var> is a properly nested string.</li>
<li>or <var>S</var> has the form <var>VW</var> where <var>V</var> and <var>W</var> are properly nested strings.</li>
</ul>
<p>For example, the string "{[()()]}" is properly nested but "([)()]" is not.</p>
<p>You are given a string consisting only of '(', ')', '[', ']', '{' and '}' characters, determine whether the string is properly nested or not.</p>`,
    input: `<p>The input consists of a string consisting only of '(', ')', '[', ']', '{' and '}' characters. |<var>s</var>| ≤ 10<sup>5</sup></p>`,
    output: `<p>Print <code>yes</code> if the string is properly nested, or <code>no</code> otherwise.</p>`,
    constraints: `<ul><li>|<var>s</var>| ≤ 10<sup>5</sup></li></ul>`,
    examples: [
      { input: L("{[()()]}"), output: L("yes") },
      { input: L("([)()]"), output: L("no") },
      { input: L("(()(())())"), output: L("yes") },
      { input: L("())"), output: L("no") }
    ],
    notes: "",
    warnings: [
      "In the PDF text the definition only lists the form “(<var>U</var>)”, although the problem uses three bracket kinds (the examples show this clearly). It is reproduced as extracted; the forms [<var>U</var>] and {<var>U</var>} may have been lost from the original.",
      "Symbols <var>S</var>, <var>n</var>, <var>U</var>, <var>V</var>, <var>W</var> and the words “yes / no” were detached and put back from context."
    ],
    hints: [
      "Look at the second sample: a closing bracket arrives while a different kind of bracket is still open.",
      "A closing bracket is only valid if the last bracket that is still open is its partner. Think of a structure where the newest item is always the first one you look at.",
      "Scan left to right and remember the unclosed opening brackets in order. Each closing bracket must match the newest one, otherwise the answer is “no”. At the end nothing may be left unclosed."
    ]
  },

  /* ───────────── H ───────────── */
  {
    id: "problem-h", number: 8, letter: "H", title: "Ada and Queue",
    limits: { time: "1 second", memory: "256 megabytes" },
    statement: `
<p>Ada the Ladybug has many things to do. She puts them into her queue. Anyway she is very indecisive, so sometime she uses the top, sometime the back and sometime she decides to reverses it.</p>`,
    input: `
<p>The first line consists of <var>Q</var>, number of queries (1 ≤ <var>Q</var> ≤ 10<sup>6</sup>). Each of them contains one of following commands</p>
<ul>
<li><code>back</code> - Print number from back and then erase it</li>
<li><code>front</code> - Print number from front and then erase it</li>
<li><code>reverse</code> - Reverses all elements in queue</li>
<li><code>push_back N</code> - Add element <var>N</var> to back</li>
<li><code>toFront N</code> - Put element <var>N</var> to front</li>
</ul>
<p>All numbers will be 0 ≤ <var>N</var> ≤ 100</p>`,
    output: `
<p>For each back/front query print appropriate number.</p>
<p>If you would get this type of query and the queue would be empty, print "No job for Ada?" instead.</p>`,
    constraints: `<ul><li>1 ≤ <var>Q</var> ≤ 10<sup>6</sup></li><li>0 ≤ <var>N</var> ≤ 100</li></ul>`,
    examples: [
      {
        input: L("15", "toFront 93", "front", "back", "reverse", "back", "reverse", "toFront 80", "push_back 53", "push_back 50", "front", "front", "reverse", "push_back 66", "reverse", "front"),
        output: L("93", "No job for Ada?", "No job for Ada?", "80", "53", "66")
      }
    ],
    notes: "",
    warnings: [
      "The symbol <var>N</var> after <code>push_back</code> / <code>toFront</code>, the symbol <var>Q</var>, and the bound 0 ≤ <var>N</var> ≤ 100 were detached in the PDF text and put back from context.",
      "The exponent of 10<sup>6</sup> was re-attached from a stray “6”."
    ],
    hints: [
      "Reversing the whole queue every time you are asked to would be far too slow.",
      "What if you never really reverse it, and only remember which end is currently the “front”?",
      "Use a structure that allows adding and removing at both ends, plus one flag saying whether the queue is currently flipped. When flipped, front/back and toFront/push_back swap roles. Don't forget the “No job for Ada?” case for an empty queue."
    ]
  },

  /* ───────────── I ───────────── */
  {
    id: "problem-i", number: 9, letter: "I", title: "Lena and the Blocks, Again",
    limits: { time: "1 second", memory: "256 megabytes" },
    statement: `
<p>Remember Lena? The girl you helped earlier Well, she's now safe thanks to you. But unfortunately Lena won't stop this dangerous game, instead, she decided to play it with more towers. Here's the game in case you forgot:</p>
<p>Lena arranges some blocks as towers and jumps from one to another until the end.</p>
<p>Since this time the towers are much more, the game is dangerous, so you need to be extremely careful while solving this problem.</p>
<p>Your task is to tell Lena's father the minimum distance between one of the tallest towers and one of the shortest towers and remember if you can't solve this problem, Lena will be in danger good luck!</p>`,
    input: `
<p>The first line contains a single integer <var>N</var> (1 ≤ <var>N</var> ≤ 100000) – the number of towers.</p>
<p>The next line contains <var>N</var> space separated integers <var>a<sub>i</sub></var> (1 ≤ <var>a<sub>i</sub></var> ≤ 10<sup>9</sup>) – the number of blocks in the <var>i</var>th tower.</p>`,
    output: `<p>Print a single integer, the minimum distance between one of the tallest towers and one of the shortest towers.</p>`,
    constraints: `<ul><li>1 ≤ <var>N</var> ≤ 100000</li><li>1 ≤ <var>a<sub>i</sub></var> ≤ 10<sup>9</sup></li></ul>`,
    examples: [
      { input: L("4", "1 1 2 2"), output: L("1") }
    ],
    notes: `
<p>A tower is in the shape of a single column of blocks, and each block's height is exactly 1 metre.</p>
<p>The distance between the <var>i</var>th and the <var>j</var>th towers equals |<var>i</var> − <var>j</var>|</p>`,
    warnings: [
      "Some words were detached from this statement in the PDF text (stray “. . .” and “really”). They could not be placed reliably, so the sentences are shown as extracted — the original probably has ellipses after “earlier” and an emphasised word such as “really” in the “dangerous” sentences.",
      "Symbols <var>N</var>, <var>a<sub>i</sub></var> and the exponent in 10<sup>9</sup> were re-attached from the surrounding text."
    ],
    hints: [
      "Only two kinds of towers matter: the tallest ones and the shortest ones.",
      "First find the maximum and the minimum height. Then think about the closest pair of positions where one holds a maximum and the other a minimum.",
      "One left-to-right pass is enough: remember the latest position of a tallest tower and of a shortest tower seen so far, and compare distances whenever you meet one of them. Think about what happens when all towers have the same height."
    ]
  },

  /* ───────────── J ───────────── */
  {
    id: "problem-j", number: 10, letter: "J", title: "M-islands",
    limits: { time: "2 seconds", memory: "256 megabytes" },
    statement: `
<p>There are <var>m</var> islands numbered from 1 to <var>m</var>, and <var>n</var> ships. Each ship has a group of islands numbered from <var>L</var> to <var>R</var> (1 ≤ <var>L</var> ≤ <var>R</var> ≤ <var>m</var>) and can transport passengers between any two of them.</p>
<p>There are <var>q</var> persons, each of them wants to go from the island <var>u</var> to the island <var>v</var>. Your job is to find out if he can go or not</p>`,
    input: `
<p>The First line contains two numbers <var>n</var>, <var>m</var> (1 ≤ <var>m</var> ≤ 10<sup>9</sup>, 1 ≤ <var>n</var> ≤ 10<sup>5</sup>)</p>
<p>The next <var>n</var> lines contains <var>L</var>, <var>R</var> for the current ship (1 ≤ <var>L</var> ≤ <var>R</var> ≤ <var>m</var>)</p>
<p>The next line contains a number <var>q</var> (1 ≤ <var>q</var> ≤ 10<sup>5</sup>)</p>
<p>The next <var>q</var> lines contains <var>u</var>, <var>v</var> for the current person (1 ≤ <var>u</var>,<var>v</var> ≤ <var>m</var>)</p>`,
    output: `<p>Print <var>q</var> lines each of them contains "YES" if this person can go and "NO" otherwise.</p>`,
    constraints: `<ul><li>1 ≤ <var>m</var> ≤ 10<sup>9</sup></li><li>1 ≤ <var>n</var> ≤ 10<sup>5</sup></li><li>1 ≤ <var>L</var> ≤ <var>R</var> ≤ <var>m</var></li><li>1 ≤ <var>q</var> ≤ 10<sup>5</sup></li><li>1 ≤ <var>u</var>, <var>v</var> ≤ <var>m</var></li></ul>`,
    examples: [
      {
        input: L("5 20", "1 2", "2 3", "5 9", "7 10", "15 20", "9", "1 2", "1 3", "2 3", "1 4", "5 4", "5 10", "6 9", "16 19", "5 16"),
        output: L("YES", "YES", "YES", "NO", "NO", "YES", "YES", "YES", "NO")
      }
    ],
    notes: "",
    warnings: [
      "Inequality signs and exponents in the bounds were scrambled in the PDF text (e.g. “(1 q )”, “9 105”). They were rebuilt from the order of the stray symbols; the sample (n = 5, m = 20) confirms that <var>n</var> comes before <var>m</var>.",
      "In the PDF the ship line may use subscripts (L<sub>i</sub>, R<sub>i</sub>); they were lost."
    ],
    hints: [
      "Two islands of the same ship are connected. What about islands that are connected through several ships?",
      "Ships whose ranges share at least one island act together as one bigger group. Sort the ranges and merge the overlapping ones.",
      "After merging, an island belongs to at most one merged range (or to none). Because m is huge you can't mark every island, so answer each query by locating the merged range of each endpoint in the sorted list, for example with a binary search."
    ]
  },

  /* ───────────── K ───────────── */
  {
    id: "problem-k", number: 11, letter: "K", title: "max element in stack",
    limits: { time: "3 seconds", memory: "256 megabytes" },
    statement: `
<p>You have a stack. And you must do <var>n</var> operations.</p>
<p>Each operation is one of these types:</p>
<ul>
<li><code>1 X</code>, (−10<sup>18</sup> ≤ <var>X</var> ≤ 10<sup>18</sup>) means put <var>X</var> on top of the stack.</li>
<li><code>2</code>, means remove the top element in the stack.</li>
</ul>
<p>After each operation, you must print the maximum element in the stack.</p>`,
    input: `
<p>First line contains <var>n</var> (1 ≤ <var>n</var> ≤ 2 ∗ 10<sup>6</sup>), the number operations.</p>
<p>The next <var>n</var> lines contain one type of operation.</p>
<p>It grantee that the stack has at least one element after each operation.</p>`,
    output: `<p>print <var>n</var> lines, the <var>i</var><sup>th</sup> contains the maximum element in the stack after the <var>i</var><sup>th</sup> operation.</p>`,
    constraints: `<ul><li>1 ≤ <var>n</var> ≤ 2 ∗ 10<sup>6</sup></li><li>−10<sup>18</sup> ≤ <var>X</var> ≤ 10<sup>18</sup></li></ul>`,
    examples: [
      { input: L("5", "1 5", "1 3", "1 6", "2", "2"), output: L("5", "5", "6", "5", "5") }
    ],
    notes: `
<p>after 1<sup>st</sup> operation stack contains <code>5</code>.</p>
<p>after 2<sup>nd</sup> operation stack contains <code>5, 3</code>.</p>
<p>after 3<sup>rd</sup> operation stack contains <code>5, 3, 6</code>.</p>
<p>after 4<sup>th</sup> operation stack contains <code>5, 3</code>.</p>
<p>after 5<sup>th</sup> operation stack contains <code>5</code>.</p>`,
    warnings: ["Exponents in 10<sup>18</sup> and 2 ∗ 10<sup>6</sup> were re-attached from stray digits (“18 1018”, “6”)."],
    hints: [
      "After a removal, the maximum can go back to an older value.",
      "Remember what the maximum was at the moment each element was placed on the stack.",
      "Let every stack element carry one extra piece of information: the maximum of everything at or below it. Then the answer after any operation is read directly from the current top, with no searching."
    ]
  },

  /* ───────────── L ───────────── */
  {
    id: "problem-l", number: 12, letter: "L", title: "Pair of Topics",
    limits: { time: "2 seconds", memory: "256 megabytes" },
    statement: `
<p>The next lecture in a high school requires two topics to be discussed. The <var>i</var>-th topic is interesting by <var>a<sub>i</sub></var> units for the teacher and by <var>b<sub>i</sub></var> units for the students.</p>
<p>The pair of topics <var>i</var> and <var>j</var> (<var>i</var> &lt; <var>j</var>) is called good if <var>a<sub>i</sub></var> + <var>a<sub>j</sub></var> &gt; <var>b<sub>i</sub></var> + <var>b<sub>j</sub></var> (i.e. it is more interesting for the teacher).</p>
<p>Your task is to find the number of good pairs of topics.</p>`,
    input: `
<p>The first line of the input contains one integer <var>n</var> (2 ≤ <var>n</var> ≤ 2 ⋅ 10<sup>5</sup>) — the number of topics.</p>
<p>The second line of the input contains <var>n</var> integers <var>a<sub>1</sub></var>, <var>a<sub>2</sub></var>, …, <var>a<sub>n</sub></var> (1 ≤ <var>a<sub>i</sub></var> ≤ 10<sup>9</sup>), where <var>a<sub>i</sub></var> is the interestingness of the <var>i</var>-th topic for the teacher.</p>
<p>The third line of the input contains <var>n</var> integers <var>b<sub>1</sub></var>, <var>b<sub>2</sub></var>, …, <var>b<sub>n</sub></var> (1 ≤ <var>b<sub>i</sub></var> ≤ 10<sup>9</sup>), where <var>b<sub>i</sub></var> is the interestingness of the <var>i</var>-th topic for the students.</p>`,
    output: `<p>Print one integer — the number of good pairs of topic.</p>`,
    constraints: `<ul><li>2 ≤ <var>n</var> ≤ 2 ⋅ 10<sup>5</sup></li><li>1 ≤ <var>a<sub>i</sub></var> ≤ 10<sup>9</sup></li><li>1 ≤ <var>b<sub>i</sub></var> ≤ 10<sup>9</sup></li></ul>`,
    examples: [
      { input: L("5", "4 8 2 6 2", "4 5 4 1 3"), output: L("7") },
      { input: L("4", "1 3 2 4", "1 3 2 4"), output: L("0") }
    ],
    notes: "",
    warnings: ["Math symbols (<var>a<sub>i</sub></var>, <var>b<sub>i</sub></var>, inequality signs, exponents) were detached in the PDF text and re-assembled from context."],
    hints: [
      "Rewrite the condition so that every topic contributes just one number.",
      "a_i + a_j > b_i + b_j is the same as (a_i − b_i) + (a_j − b_j) > 0. So each topic has a single value, and you are counting pairs whose values add up to something positive.",
      "The sum doesn't depend on order, so i < j only stops you from counting a pair twice. Sort the values and, for each one, count how many partners make the sum positive, for example with two pointers or a binary search."
    ]
  },

  /* ───────────── M ───────────── */
  {
    id: "problem-m", number: 13, letter: "M", title: "Catch Overflow!",
    limits: { time: "1 second", memory: "256 megabytes" },
    statement: `
<p>You are given a function <var>f</var> written in some basic language. The function accepts an integer value, which is immediately written into some variable <var>x</var>. <var>x</var> is an integer variable and can be assigned values from 0 to 2<sup>32</sup> − 1. The function contains three types of commands:</p>
<ul>
<li><code>for n</code> — for loop;</li>
<li><code>end</code> — every command between "for <var>n</var>" and corresponding "end" is executed <var>n</var> times;</li>
<li><code>add</code> — adds 1 to <var>x</var>.</li>
</ul>
<p>After the execution of these commands, value of <var>x</var> is returned.</p>
<p>Every "for <var>n</var>" is matched with "end", thus the function is guaranteed to be valid. "for <var>n</var>" can be immediately followed by "end". "add" command can be outside of any for loops.</p>
<p>Notice that "add" commands might overflow the value of <var>x</var>! It means that the value of <var>x</var> becomes greater than 2<sup>32</sup> − 1 after some "add" command.</p>
<p>Now you run <var>f</var>(0) and wonder if the resulting value of <var>x</var> is correct or some overflow made it incorrect.</p>
<p>If overflow happened then output "OVERFLOW!!!", otherwise print the resulting value of <var>x</var>.</p>`,
    input: `
<p>The first line contains a single integer <var>l</var> (1 ≤ <var>l</var> ≤ 10<sup>5</sup>) — the number of lines in the function.</p>
<p>Each of the next <var>l</var> lines contains a single command of one of three types:</p>
<ul>
<li><code>for n</code> (1 ≤ <var>n</var> ≤ 100) — for loop;</li>
<li><code>end</code> — every command between "for <var>n</var>" and corresponding "end" is executed <var>n</var> times;</li>
<li><code>add</code> — adds 1 to <var>x</var>.</li>
</ul>`,
    output: `<p>If overflow happened during execution of <var>f</var>(0), then output "OVERFLOW!!!", otherwise print the resulting value of <var>x</var>.</p>`,
    constraints: `<ul><li>1 ≤ <var>l</var> ≤ 10<sup>5</sup></li><li>1 ≤ <var>n</var> ≤ 100</li><li><var>x</var> is in the range 0 … 2<sup>32</sup> − 1</li></ul>`,
    examples: [
      { input: L("9", "add", "for 43", "end", "for 10", "for 15", "add", "end", "add", "end"), output: L("161") },
      { input: L("2", "for 62", "end"), output: L("0") },
      { input: L("11", "for 100", "for 100", "for 100", "for 100", "for 100", "add", "end", "end", "end", "end", "end"), output: L("OVERFLOW!!!") }
    ],
    notes: `
<p>In the first example the first "add" is executed 1 time, the second "add" is executed 150 times and the last "add" is executed 10 times. Note that "for 43" can be immediately followed by "end" and that "add" can be outside of any for loops.</p>
<p>In the second example there are no commands "add", thus the returning value is 0.</p>
<p>In the third example "add" command is executed too many times, which causes <var>x</var> to go over 2<sup>32</sup> − 1.</p>`,
    warnings: [
      "The three sample inputs were interleaved in the PDF text with their first lines glued to other words (e.g. “9a dd”, “2f or62”). They were separated line by line; the totals match the sample outputs (1 + 150 + 10 = 161, and 100<sup>5</sup> > 2<sup>32</sup> − 1).",
      "In the notes, the number after “for” in the first example was lost; “43” is read from the sample input (<code>for 43</code> followed by <code>end</code>)."
    ],
    hints: [
      "Loops can be nested, so one “add” line may run many more times than it appears.",
      "The number of times an “add” runs is the product of all loop counts that enclose it. Think about how to know that product at every line.",
      "Maintain the product of the loops that are currently open (and undo it at each “end”), and add it to the total at every “add”. The numbers can become astronomically large, so decide at what point you can stop caring about the exact value."
    ]
  },

  /* ───────────── N ───────────── */
  {
    id: "problem-n", number: 14, letter: "N", title: "Great Vova Wall (Version 1)",
    limits: { time: "2 seconds", memory: "256 megabytes" },
    statement: `
<p>Vova's family is building the Great Vova Wall (named by Vova himself). Vova's parents, grandparents, grand-grandparents contributed to it. Now it's totally up to Vova to put the finishing touches.</p>
<p>The current state of the wall can be respresented by a sequence <var>a</var> of <var>n</var> integers, with <var>a<sub>i</sub></var> being the height of the <var>i</var>-th part of the wall.</p>
<p>Vova can only use 2×1 bricks to put in the wall (he has infinite supply of them, however).</p>
<p>Vova can put bricks horizontally on the neighboring parts of the wall of equal height. It means that if for some <var>i</var> the current height of part <var>i</var> is the same as for part <var>i</var>+1, then Vova can put a brick there and thus increase both heights by 1. Obviously, Vova can't put bricks in such a way that its parts turn out to be off the borders (to the left of part 1 of the wall or to the right of part <var>n</var> of it).</p>
<p>The next paragraph is specific to the version 1 of the problem.</p>
<p>Vova can also put bricks vertically. That means increasing height of any part of the wall by 2.</p>
<p>Vova is a perfectionist, so he considers the wall completed when:</p>
<ul><li>all parts of the wall has the same height;</li><li>the wall has no empty spaces inside it.</li></ul>
<p>Can Vova complete the wall using any amount of bricks (possibly zero)?</p>`,
    input: `
<p>The first line contains a single integer <var>n</var> (1 ≤ <var>n</var> ≤ 2 ⋅ 10<sup>5</sup>) — the number of parts in the wall.</p>
<p>The second line contains <var>n</var> integers <var>a<sub>1</sub></var>, <var>a<sub>2</sub></var>, …, <var>a<sub>n</sub></var> (1 ≤ <var>a<sub>i</sub></var> ≤ 10<sup>9</sup>) — the initial heights of the parts of the wall.</p>`,
    output: `<p>Print "YES" if Vova can complete the wall using any amount of bricks (possibly zero).</p><p>Print "NO" otherwise.</p>`,
    constraints: `<ul><li>1 ≤ <var>n</var> ≤ 2 ⋅ 10<sup>5</sup></li><li>1 ≤ <var>a<sub>i</sub></var> ≤ 10<sup>9</sup></li></ul>`,
    examples: [
      { input: L("5", "2 1 1 2 5"), output: L("YES") },
      { input: L("3", "4 5 3"), output: L("YES") },
      { input: L("2", "10 10"), output: L("YES") },
      { input: L("3", "1 2 3"), output: L("NO") }
    ],
    notes: `
<p>In the first example Vova can put a brick on parts 2 and 3 to make the wall <code>[2, 2, 2, 2, 5]</code> and then put 3 bricks on parts 1 and 2 and 3 bricks on parts 3 and 4 to make it <code>[5, 5, 5, 5, 5]</code>.</p>
<p>In the second example Vova can put a brick vertically on part 3 to make the wall <code>[4, 5, 5]</code>, then horizontally on parts 2 and 3 to make it <code>[4, 6, 6]</code> and then vertically on part 1 to make it <code>[6, 6, 6]</code>.</p>
<p>In the third example the wall is already complete.</p>`,
    warnings: [
      "The size “2×1” of the bricks was detached in the PDF text. It was put back after “only use”, using the standard wording of this statement.",
      "Symbols (<var>a<sub>i</sub></var>, <var>n</var>, <var>i</var>+1) and exponents were re-assembled from context."
    ],
    hints: [
      "A vertical brick adds exactly 2. What does that say about two heights that differ by an even number?",
      "Vertical bricks never change whether a height is odd or even, so only the parity of each part matters for what can be fixed. A horizontal brick always hits two neighbours with the same height.",
      "Two neighbouring parts with the same parity can be made equal and so they “cancel” each other. After removing such pairs (repeatedly, including ones that become neighbours after a removal), look at what is left and decide when the wall can be completed."
    ]
  },

  /* ───────────── O ───────────── */
  {
    id: "problem-o", number: 15, letter: "O", title: "Cd and pwd commands",
    limits: { time: "3 seconds", memory: "256 megabytes" },
    statement: `
<p>Vasya is writing an operating system shell, and it should have commands for working with directories. To begin with, he decided to go with just two commands: cd (change the current directory) and pwd (display the current directory).</p>
<p>Directories in Vasya's operating system form a traditional hierarchical tree structure. There is a single root directory, denoted by the slash character "/". Every other directory has a name — a non-empty string consisting of lowercase Latin letters. Each directory (except for the root) has a parent directory — the one that contains the given directory. It is denoted as "..".</p>
<p>The command cd takes a single parameter, which is a path in the file system. The command changes the current directory to the directory specified by the path. The path consists of the names of directories separated by slashes. The name of the directory can be "..", which means a step up to the parent directory. «..» can be used in any place of the path, maybe several times. If the path begins with a slash, it is considered to be an absolute path, that is, the directory changes to the specified one, starting from the root. If the parameter begins with a directory name (or ".."), it is considered to be a relative path, that is, the directory changes to the specified directory, starting from the current one.</p>
<p>The command pwd should display the absolute path to the current directory. This path must not contain "..".</p>
<p>Initially, the current directory is the root. All directories mentioned explicitly or passed indirectly within any command cd are considered to exist. It is guaranteed that there is no attempt of transition to the parent directory of the root directory.</p>`,
    input: `
<p>The first line of the input data contains the single integer n (1 ≤ n ≤ 50) — the number of commands.</p>
<p>Then follow n lines, each contains one command. Each of these lines contains either command pwd, or command cd, followed by a space-separated non-empty parameter.</p>
<p>The command parameter cd only contains lower case Latin letters, slashes and dots, two slashes cannot go consecutively, dots occur only as the name of a parent pseudo-directory. The command parameter cd does not end with a slash, except when it is the only symbol that points to the root directory. The command parameter has a length from 1 to 200 characters, inclusive.</p>
<p>Directories in the file system can have the same names.</p>`,
    output: `<p>For each command pwd you should print the full absolute path of the given directory, ending with a slash. It should start with a slash and contain the list of slash-separated directories in the order of being nested from the root to the current folder. It should contain no dots.</p>`,
    constraints: `<ul><li>1 ≤ n ≤ 50</li><li>Length of a cd parameter: 1 to 200 characters</li></ul>`,
    examples: [
      { input: L("7", "pwd", "cd /home/vasya", "pwd", "cd ..", "pwd", "cd vasya/../petya", "pwd"), output: L("/", "/home/vasya/", "/home/", "/home/petya/") },
      { input: L("4", "cd /a/b", "pwd", "cd ../a/b", "pwd"), output: L("/a/b/", "/a/a/b/") }
    ],
    notes: "",
    warnings: [],
    hints: [
      "Is the path absolute or relative? That decides where you start from.",
      "Represent the current directory as an ordered list of names, and process the path piece by piece, splitting it on slashes.",
      "For an absolute path start from an empty list, for a relative path start from the current one. A normal name goes to the end of the list and “..” removes the last name. For pwd, join the names with slashes with a slash at the start and at the end (the root is just “/”)."
    ]
  },

  /* ───────────── P ───────────── */
  {
    id: "problem-p", number: 16, letter: "P", title: "Valeriy and Deque",
    limits: { time: "6 seconds", memory: "256 megabytes" },
    statement: `
<p>Recently, on the course of algorithms and data structures, Valeriy learned how to use a deque. He built a deque filled with <var>n</var> elements. The <var>i</var>-th element is <var>a<sub>i</sub></var> (<var>i</var> = 1, 2, …, <var>n</var>). He gradually takes the first two leftmost elements from the deque (let's call them <var>A</var> and <var>B</var>, respectively), and then does the following: if <var>A</var> &gt; <var>B</var>, he writes <var>A</var> to the beginning and <var>B</var> to the end of the deque, otherwise, he writes <var>B</var> to the beginning , and <var>A</var> to the end of the deque. We call this sequence of actions an operation.</p>
<p>For example, if deque was <code>[2, 3, 4, 5, 1]</code>, on the operation he will write <var>B</var> = 3 to the beginning and <var>A</var> = 2 to the end, so he will get <code>[3, 4, 5, 1, 2]</code>.</p>
<p>The teacher of the course, seeing Valeriy, who was passionate about his work, approached him and gave him <var>q</var> queries. Each query consists of the singular number <var>m<sub>j</sub></var> (<var>j</var> = 1, 2, …, <var>q</var>). It is required for each query to answer which two elements he will pull out on the <var>m<sub>j</sub></var>-th operation.</p>
<p>Note that the queries are independent and for each query the numbers <var>A</var> and <var>B</var> should be printed in the order in which they will be pulled out of the deque.</p>
<p>Deque is a data structure representing a list of elements where insertion of new elements or deletion of existing elements can be made from both sides.</p>`,
    input: `
<p>The first line contains two integers <var>n</var> and <var>q</var> (2 ≤ <var>n</var> ≤ 10<sup>5</sup>, 0 ≤ <var>q</var> ≤ 3 ⋅ 10<sup>5</sup>) — the number of elements in the deque and the number of queries. The second line contains <var>n</var> integers <var>a<sub>1</sub></var>, <var>a<sub>2</sub></var>, ..., <var>a<sub>n</sub></var>, where <var>a<sub>i</sub></var> (0 ≤ <var>a<sub>i</sub></var> ≤ 10<sup>9</sup>) — the deque element in <var>i</var>-th position. The next <var>q</var> lines contain one number each, meaning <var>m<sub>j</sub></var> (1 ≤ <var>m<sub>j</sub></var> ≤ 10<sup>18</sup>).</p>`,
    output: `<p>For each teacher's query, output two numbers <var>A</var> and <var>B</var> — the numbers that Valeriy pulls out of the deque for the <var>m<sub>j</sub></var>-th operation.</p>`,
    constraints: `<ul><li>2 ≤ <var>n</var> ≤ 10<sup>5</sup></li><li>0 ≤ <var>q</var> ≤ 3 ⋅ 10<sup>5</sup></li><li>0 ≤ <var>a<sub>i</sub></var> ≤ 10<sup>9</sup></li><li>1 ≤ <var>m<sub>j</sub></var> ≤ 10<sup>18</sup></li></ul>`,
    examples: [
      { input: L("5 3", "1 2 3 4 5", "1", "2", "10"), output: L("1 2", "2 3", "5 2") },
      { input: L("2 0", "0 0"), output: "" }
    ],
    notes: `
<p>Consider all 10 steps for the first test in detail:</p>
<ol>
<li><code>[1, 2, 3, 4, 5]</code> — on the first operation <var>A</var> and <var>B</var> are 1 and 2, respectively.<br>So, we write 2 to the beginning of the deque, and 1 — to the end.<br>We get the following status of the deque: <code>[2, 3, 4, 5, 1]</code>.</li>
<li><code>[2, 3, 4, 5, 1]</code> ⇒ <var>A</var> = 2, <var>B</var> = 3.</li>
<li><code>[3, 4, 5, 1, 2]</code></li>
<li><code>[4, 5, 1, 2, 3]</code></li>
<li><code>[5, 1, 2, 3, 4]</code></li>
<li><code>[5, 2, 3, 4, 1]</code></li>
<li><code>[5, 3, 4, 1, 2]</code></li>
<li><code>[5, 4, 1, 2, 3]</code></li>
<li><code>[5, 1, 2, 3, 4]</code></li>
<li><code>[5, 2, 3, 4, 1]</code> ⇒ <var>A</var> = 5, <var>B</var> = 2.</li>
</ol>`,
    warnings: [
      "The second sample has an empty output (q = 0), exactly as in the PDF.",
      "The ten steps in the notes are reproduced from the PDF as extracted (each line is the deque before that operation).",
      "Math symbols and exponents (10<sup>5</sup>, 3 ⋅ 10<sup>5</sup>, 10<sup>9</sup>, 10<sup>18</sup>) were re-assembled from context."
    ],
    hints: [
      "Once something very large reaches the front, what happens to it afterwards?",
      "Simulate the first operations honestly until the largest element of the whole deque is at the front. From then on the front element never changes.",
      "After the maximum is at the front, the rest of the deque just rotates in a fixed cycle of length n − 1. Answer early queries from the recorded history of pulled pairs, and later queries by taking the query number modulo n − 1 into the rotating part."
    ]
  },

  /* ───────────── Q ───────────── */
  {
    id: "problem-q", number: 17, letter: "Q", title: "Cut and Paste",
    limits: { time: "2 seconds", memory: "256 megabytes" },
    statement: `
<p>We start with a string <var>s</var> consisting only of the digits 1, 2, or 3. The length of <var>s</var> is denoted by |<var>s</var>|. For each <var>i</var> from 1 to |<var>s</var>|, the <var>i</var>-th character of <var>s</var> is denoted by <var>s<sub>i</sub></var>.</p>
<p>There is one cursor. The cursor's location ℓ is denoted by an integer in {0, …, |<var>s</var>|}, with the following meaning:</p>
<ul>
<li>If ℓ = 0, then the cursor is located before the first character of <var>s</var>.</li>
<li>If ℓ = |<var>s</var>|, then the cursor is located right after the last character of <var>s</var>.</li>
<li>If 0 &lt; ℓ &lt; |<var>s</var>|, then the cursor is located between <var>s<sub>ℓ</sub></var> and <var>s<sub>ℓ+1</sub></var>.</li>
</ul>
<p>We denote by <var>s<sub>left</sub></var> the string to the left of the cursor and <var>s<sub>right</sub></var> the string to the right of the cursor.</p>
<p>We also have a string <var>c</var>, which we call our clipboard, which starts out as empty. There are three types of actions:</p>
<ul>
<li>The Move action. Move the cursor one step to the right. This increments ℓ once.</li>
<li>The Cut action. Set <var>c</var> ← <var>s<sub>right</sub></var>, then set <var>s</var> ← <var>s<sub>left</sub></var>.</li>
<li>The Paste action. Append the value of <var>c</var> to the end of the string <var>s</var>. Note that this doesn't modify <var>c</var>.</li>
</ul>
<p>The cursor initially starts at ℓ = 0. Then, we perform the following procedure:</p>
<ol>
<li>Perform the Move action once.</li>
<li>Perform the Cut action once.</li>
<li>Perform the Paste action <var>s<sub>ℓ</sub></var> times.</li>
<li>If ℓ = <var>x</var>, stop. Otherwise, return to step 1.</li>
</ol>
<p>You're given the initial string <var>s</var> and the integer <var>x</var>. What is the length of <var>s</var> when the procedure stops? Since this value may be very large, only find it modulo 10<sup>9</sup> + 7.</p>
<p>It is guaranteed that ℓ ≤ |<var>s</var>| at any time.</p>`,
    input: `
<p>The first line of input contains a single integer <var>t</var> (1 ≤ <var>t</var> ≤ 1000) denoting the number of test cases. The next lines contain descriptions of the test cases.</p>
<p>The first line of each test case contains a single integer <var>x</var> (1 ≤ <var>x</var> ≤ 10<sup>6</sup>). The second line of each test case consists of the initial string <var>s</var> (1 ≤ |<var>s</var>| ≤ 500). It is guaranteed, that <var>s</var> consists of the characters "1", "2", "3".</p>
<p>It is guaranteed that the sum of <var>x</var> in a single file is at most 10<sup>6</sup>. It is guaranteed that in each test case before the procedure will stop it will be true that ℓ ≤ |<var>s</var>| at any time.</p>`,
    output: `<p>For each test case, output a single line containing a single integer denoting the answer for that test case modulo 10<sup>9</sup> + 7.</p>`,
    constraints: `<ul><li>1 ≤ <var>t</var> ≤ 1000</li><li>1 ≤ <var>x</var> ≤ 10<sup>6</sup>, and the sum of <var>x</var> in a file is at most 10<sup>6</sup></li><li>1 ≤ |<var>s</var>| ≤ 500, only the characters "1", "2", "3"</li><li>ℓ ≤ |<var>s</var>| at any time</li><li>Answer modulo 10<sup>9</sup> + 7</li></ul>`,
    examples: [
      { input: L("4", "5", "231", "7", "2323", "6", "333", "24", "133321333"), output: L("25", "1438", "1101", "686531475") }
    ],
    notes: `
<p>Let's illustrate what happens with the first test case. Initially, we have <var>s</var> = 231. Initially, ℓ = 0 and <var>c</var> = ε (the empty string). The following things happen if we follow the procedure above:</p>
<ul>
<li>Step 1, Move once: we get ℓ = 1.</li>
<li>Step 2, Cut once: we get <code>2</code> and <code>31</code>.</li>
<li>Step 3, Paste <var>s<sub>ℓ</sub></var> = 2 times: we get <var>s</var> = <code>23131</code>.</li>
<li>Step 4: ℓ = 1 ≠ <var>x</var> = 5, so we return to step 1.</li>
<li>Step 1, Move once: we get ℓ = 2.</li>
<li>Step 2, Cut once: we get <code>23</code> and <code>131</code>.</li>
<li>Step 3, Paste <var>s<sub>ℓ</sub></var> = 3 times: we get <var>s</var> = <code>23131131131</code>.</li>
<li>Step 4: ℓ = 2 ≠ <var>x</var> = 5, so we return to step 1.</li>
<li>Step 1, Move once: we get ℓ = 3.</li>
<li>Step 2, Cut once: we get <code>231</code> and <code>31131131</code>.</li>
<li>Step 3, Paste <var>s<sub>ℓ</sub></var> = 1 time: we get <var>s</var> = <code>23131131131</code>.</li>
<li>Step 4: ℓ = 3 ≠ <var>x</var> = 5, so we return to step 1.</li>
<li>Step 1, Move once: we get ℓ = 4.</li>
<li>Step 2, Cut once: we get <code>2313</code> and <code>1131131</code>.</li>
<li>Step 3, Paste <var>s<sub>ℓ</sub></var> = 3 times: we get <var>s</var> = <code>2313113113111311311131131</code>.</li>
<li>Step 4: ℓ = 4 ≠ <var>x</var> = 5, so we return to step 1.</li>
<li>Step 1, Move once: we get ℓ = 5.</li>
<li>Step 2, Cut once: we get <code>23131</code> and <code>13113111311311131131</code>.</li>
<li>Step 3, Paste <var>s<sub>ℓ</sub></var> = 1 times: we get <var>s</var> = <code>2313113113111311311131131</code>.</li>
<li>Step 4: ℓ = 5 = <var>x</var>, so we stop.</li>
</ul>
<p>At the end of the procedure, <var>s</var> has length 25.</p>`,
    warnings: [
      "In the PDF text, the symbols “s =”, “c =”, “ℓ” and the values of s<sub>ℓ</sub> were detached from the walkthrough lines. They were re-attached from the sequence of values and checked by hand against the procedure (lengths 5 → 11 → 11 → 25 → 25). Please compare the notation with the original PDF if anything looks odd.",
      "The statement sentence “Paste the action <var>s<sub>ℓ</sub></var> times” was restored from the stray symbol list and the walkthrough."
    ],
    hints: [
      "You never need the whole string. You only need its length and its first few characters.",
      "Characters beyond position x are never read, so you can stop storing the actual text once it is long enough, while still tracking the true length separately.",
      "The new length comes from the kept left part (length ℓ) plus the cut part repeated s_ℓ times. Build the real string only until it reaches length x, then only update the length modulo 10^9 + 7 (careful with subtraction under a modulus)."
    ]
  },

  /* ───────────── R ───────────── */
  {
    id: "problem-r", number: 18, letter: "R", title: "Histogram",
    limits: { time: "2 seconds", memory: "64 megabytes" },
    statement: `
<p>A histogram is a polygon composed of a sequence of rectangles aligned at a common base line. The rectangles have equal widths but may have different heights. For example, the figure on the left shows the histogram that consists of rectangles with the heights 2, 1, 4, 5, 1, 3, 3, measured in units where 1 is the width of the rectangles:</p>
<p>Usually, histograms are used to represent discrete distributions, e.g., the frequencies of characters in texts. Note that the order of the rectangles, i.e., their heights, is important. Calculate the area of the largest rectangle in a histogram that is aligned at the common base line, too. The figure on the right shows the largest aligned rectangle for the depicted histogram.</p>`,
    figure: `<div class="fig-pair"><figure>${histogramSvg(false)}<figcaption>Left: heights 2, 1, 4, 5, 1, 3, 3</figcaption></figure><figure>${histogramSvg(true)}<figcaption>Right: the largest aligned rectangle (hatched)</figcaption></figure></div>`,
    input: `<p>The input contains several test cases <var>t</var> (1 ≤ <var>t</var> ≤ 100). Each test case describes a histogram and starts with an integer <var>n</var>, denoting the number of rectangles it is composed of. You may assume that (1 ≤ <var>n</var> ≤ 10<sup>5</sup>). Then follow <var>n</var> integers <var>h</var><sub>1</sub>, ..., <var>h<sub>n</sub></var>, where (0 ≤ <var>h<sub>i</sub></var> ≤ 10<sup>9</sup>). These numbers denote the heights of the rectangles of the histogram in left-to-right order. The width of each rectangle is 1.</p>`,
    output: `<p>For each test case output on a single line the area of the largest rectangle in the specified histogram. Remember that this rectangle must be aligned at the common base line.</p>`,
    constraints: `<ul><li>1 ≤ <var>t</var> ≤ 100</li><li>1 ≤ <var>n</var> ≤ 10<sup>5</sup></li><li>0 ≤ <var>h<sub>i</sub></var> ≤ 10<sup>9</sup></li><li>Width of each rectangle is 1</li></ul>`,
    examples: [
      { input: L("2", "7", "2 1 4 5 1 3 3", "4", "1000 1000 1000 1000"), output: L("8", "4000") }
    ],
    notes: "",
    warnings: ["The two figures are images in the PDF and were not copied. They are redrawn here from the heights in the statement (2, 1, 4, 5, 1, 3, 3); the hatched rectangle (height 4, width 2, area 8) matches the sample output."],
    hints: [
      "For one chosen bar, how far can a rectangle of exactly that bar's height stretch to the left and to the right?",
      "A rectangle is limited by the shortest bar inside it. For every bar, find the closest bar that is shorter on each side.",
      "Finding those closest shorter bars by plain scanning is too slow in the worst case. Keep a structure of candidate bars with increasing heights, so every bar is added once and removed once. Each bar then gives one candidate area, and you keep the largest."
    ]
  },

  /* ───────────── S ───────────── */
  {
    id: "problem-s", number: 19, letter: "S", title: "Cairo",
    limits: { time: "2 seconds", memory: "256 megabytes" },
    statement: `
<p>If you have ever been to Cairo before you would know how busy and crowded it is!</p>
<p>Looking down from my balcony to one of the narrowest main streets in the city I saw some trucks having the numbers from 1 to <var>n</var> but they weren't in order.</p>
<p>The street was so narrow that no two trucks can pass each other and there was a side street which was also so narrow that no two trucks can pass each other.</p>
<p>The last truck that enters the side street must be the first to leave so that other trucks can leave.</p>
<p>Can you tell if it's possible to re-order the trucks in the main street with the help of the side street?</p>
<p>See the first sample and the notes for more clarification.</p>`,
    input: `
<p>The first line of the input contains one integer <var>t</var> (1 ≤ <var>t</var> ≤ 1000) — The number of the test cases.</p>
<p>Each test case consists of two lines:</p>
<p>The first line of the test case contains one integer <var>n</var> (1 ≤ <var>n</var> ≤ 1000) — The number of trucks in the main street.</p>
<p>The second line of the test case contains <var>n</var> distinct integers <var>a<sub>i</sub></var> (1 ≤ <var>a<sub>i</sub></var> ≤ <var>n</var>) — These numbers indicate the order in which the trucks arrive in the main street.</p>`,
    output: `<p>For each test case, print one line containing a single word "YES" if the trucks can be re-ordered in the main street with the help of the side street, otherwise print "NO".</p>`,
    constraints: `<ul><li>1 ≤ <var>t</var> ≤ 1000</li><li>1 ≤ <var>n</var> ≤ 1000</li><li>1 ≤ <var>a<sub>i</sub></var> ≤ <var>n</var>, all distinct</li></ul>`,
    examples: [
      { input: L("1", "5", "5 1 2 4 3"), output: L("YES") }
    ],
    notes: `
<p>The sample input reflects the following situation: <i>[figure: main street, left to right, trucks 3, 4, 2, 1, 5, with truck 5 next to the side street]</i></p>
<p>The five trucks can be re-ordered in the following way: <i>[figures: truck 5 enters the side street; trucks 1 and 2 pass; truck 4 enters the side street on top of 5; truck 3 passes; then 4 and 5 leave the side street. Final figure: trucks 5, 4, 3, 2, 1 from left to right]</i></p>`,
    warnings: [
      "The four truck figures are images in the PDF and were not copied. The short descriptions in the notes were written from those figures.",
      "The statement text does not say which final order is wanted; it is only visible in the last figure (trucks leaving in the order 1, 2, …, n). The hints use that order, and sample 1 is consistent with it."
    ],
    hints: [
      "Think about what the side street does to the order of the trucks that pass through it.",
      "The side street is last-in, first-out. According to the figures, trucks must leave the main street in the order 1, 2, …, n, so at every moment you know which truck is needed next.",
      "A truck that arrives before it is needed has to wait in the side street. The truck needed next can leave either straight from the main street or from the top of the side street. Ask yourself when a truck can get stuck underneath another one."
    ]
  },

  /* ───────────── T ───────────── */
  {
    id: "problem-t", number: 20, letter: "T", title: "Longest Regular Bracket Sequence",
    limits: { time: "1 second", memory: "256 megabytes" },
    statement: `
<p>A bracket sequence is called regular if by inserting "+" and "1" into it we can get a correct mathematical expression. For example, sequences "(())()", "()" and "(()(()))" are regular, while ")(", "(()" and "(()))(" are not.</p>
<p>But in Assiut Juniors training the bracket secuency is more general so the opening brackets are "(", "[", "{" and "&lt;", and the closeing brackets for them are ")", "]", "}" and "&gt;" respectively so "[({})&lt;&gt;]" are regular, while "[{(})&lt;&gt;]" are not.</p>
<p>You are given a bracket sequence of "(", ")", "[", "]", "{", "}", "&lt;" and "&gt;" characters. You are to find its longest substring that is a regular bracket sequence. You are to find the number of such substrings as well.</p>`,
    input: `<p>The only line of input contains string <var>S</var> (1 ≤ |<var>S</var>| ≤ 10<sup>6</sup>) contains only "(", ")", "[", "]", "{", "}", "&lt;" and "&gt;" characters.</p>`,
    output: `<p>Print the length of the longest substring that is a regular bracket sequence, and the number of such substrings. If there are no such substrings, write the only line containing "0 1".</p>`,
    constraints: `<ul><li>1 ≤ |<var>S</var>| ≤ 10<sup>6</sup></li></ul>`,
    examples: [
      { input: L(")({()}))<()()>"), output: L("6 2") },
      { input: L("))("), output: L("0 1") },
      { input: L("[](<>){}"), output: L("8 1") }
    ],
    notes: "",
    warnings: [
      "Spelling mistakes (“secuency”, “closeing”) are kept as in the PDF.",
      "The symbol <var>S</var> and the exponent 10<sup>6</sup> were re-attached from stray characters."
    ],
    hints: [
      "A closing bracket of the wrong type breaks a sequence at that point.",
      "Think of every position as the possible end of a regular substring. Where could that substring start?",
      "For each position, work out the length of the longest regular substring that ends there; neighbouring regular pieces join into longer ones. The answer is the maximum of these lengths and how many positions reach it."
    ]
  }
];
