---
title: Loosening the Legacy Grip in Financial Services
date: 2026-05-10
description: Learnings from diving into core banking modernization
---

## Introduction

My time at Capital One prior to business school acquainted me with legacy core banking infrastructure. "Core banking infrastructure" refers to the systems that power critical bank activities such as managing accounts and customers, processing deposits, issuing all types of loans, and reporting for financial and regulatory use cases.

"Legacy" refers to the fact that many of these systems were originally written in COBOL, or **CO**mmon **B**usiness-**O**riented **L**anguage, a programming language created in the 1950s. Engineers trained in it are approaching retirement, and many universities no longer teach it, creating a dearth of experts who understand core banking systems. Besides being written in an aging language, these core banking systems often operate in batch cycles and are monolithic. This poses challenges when banks want to integrate their cores with other modern pieces of technology, which are often cloud-based, modular, and real-time. 

It should be no surprise then that bank executives increasingly view legacy core banking systems as rate-limiters to innovation. Banks spend significant resources to modernize these systems, yet see limited success. Geoff Hudson-Searle (former Citibank executive) estimates that 75% of all COBOL rewrite projects have resulted in failure. When they do succeed, they are expensive: Commonwealth Bank of Australia took 5 years and $750M to replace and modernize its core banking platform, requiring the help of Accenture and SAP. 

When I got to Stanford, I wanted to better understand why these transformations are so painful, and whether the recent advances in large language models could alleviate some of the pain associated with legacy cores, loosening the legacy grip. The following is a narrative of my approach and learnings over the course of 30+ conversations with COBOL developers, bank IT executives, and systems integrators. 

## Chesterton's Fence

![Chesterton's Fence](https://sproutsschools.com/wp-content/uploads/2023/05/Intro-to-Chesterton.jpeg)

G.K. Chesterton, an English writer during the 20th century, has a quote in one of his short stories that defines where we start: 

> There exists in such a case a certain institution or law; let us say, for the sake of simplicity, a fence or gate erected across a road. The more modern type of reformer goes gaily up to it and says, "I don't see the use of this; let us clear it away." To which the more intelligent type of reformer will do well to answer: "If you don't see the use of it, I certainly won't let you clear it away. Go away and think. Then, when you can come back and tell me that you do see the use of it, I may allow you to destroy it." 

The lesson: don't remove a fence until you know why it was put up in the first place. As such, I began with a curiosity about COBOL's origin story and how it reached scale in financial services.

### "English is the hottest **~old~** programming language"

COBOL emerged in the late 1950s as a response to the following question: *how do we make programming accessible to non-technical business managers?* Grace Hopper, a computer scientist known for developing the first compiler, believed that potential business users of technology were alienated by programming languages that resembled mathematics, like FORTRAN and ALGOL. Her thesis was that the mathematical, unintuitive syntax of these other languages was slowing enterprise adoption of computing altogether. 

Arriving at the same insight, computer manufacturers like IBM and Honeywell, and the government, sought to design English-like business programming languages for their machines. Wanting to get ahead of arbitrary uniqueness, the Pentagon organized the Conference on Data Systems Languages (or CODASYL) with the goal of creating **one** common business programming language that would work across all machines. At these meetings, Grace Hopper played a key role in establishing COBOL as the solution. 

The CODASYL report that contained the first full version of COBOL says: *The COBOL system allows the user to prepare his specifications for the problem solution in the language most natural to him -- namely English.* COBOL was designed so that its syntax resembled grammatically correct English. Interestingly, this resemblance was only one-way: while COBOL statements were technically valid English sentences, not all English sentences were valid COBOL code. Still, it was believed this similarity to English would enhance readability for business users, a belief so strong that early versions of COBOL did not contain the capacity to leave comments, since it was a "self-documenting" language. 

### COBOL everywhere you can't see

COBOL's readability for business audiences played a role in its widespread adoption, as did a few other factors. First, because COBOL was a standardized language across hardware providers, applications written in COBOL were portable across machines, increasing their reach. Secondly, the government's involvement in the creation of COBOL helped fuel its adoption in federal, financial, and healthcare sectors. And thirdly, COBOL was optimized for batch processing transactions at scale, which mattered a lot in these aforementioned industries. COBOL was tightly coupled with IBM Z mainframes, leading to efficiency in handling massive batches of data faster than other languages. 

Beyond just efficiency, COBOL handles calculations with greater precision than most programming languages driven by prioritizing decimal arithmetic over floating-point. This precision matters when you are processing trillions of dollars in industries like insurance, banking, and healthcare.

Fast forward to today, there is an astonishing estimate of 800 billion lines of COBOL in daily production use worldwide. Within financial services specifically, COBOL is estimated to power 95% of all ATM transactions and 80% of in-person credit card swipes. Tell me that isn't scale. 

## Challenges with COBOL Today

![Green Screen](https://hunterstrainingassociates.com/images/ispf6_25.gif)

### English, the double-edged sword

COBOL's English-likeness was meant to make programs readable, but it added surface complexity without reducing logical complexity. Every operation in COBOL is verbose, and the verbosity makes the underlying logic harder to find, not easier.

Additionally, developers do not see the need to invest in documentation given the language's resemblance to English. Ironically, this lack of documentation has led to limited interpretability of COBOL programs today. A developer we talked to summarized this well:

> Documentation, if it exists, repeats what the code says since COBOL technically uses English style commands. Critically, however, there is no documentation that explains why a program behaves the way it does. There is no contextual documentation either on how a program relates to others which makes working in COBOL codebases challenging today.

### "If it ain't broke, don't fix it"

Given COBOL's efficiency in batch processing at scale, many organizations did not want to "rock the boat". Many applications went largely untouched for 30+ years. Multiple developers noted that without investment in refactoring and documentation, the programs evolved into *complex, highly intertwined balls of yarn*. A few quotes from developers summarized this well:

> These programs have been around longer than I have, and after decades of tiny changes -- ten, twenty, thirty, forty years -- they've grown massive. 

> COBOL programs are excessively complex. I've seen codebases where there are  millions of insurance policies within it, some of which are completely defunct now from a business perspective. Yet nobody did the work of scrubbing them from the codebase because it all just worked, but now it is even harder to navigate.

When they do need to make changes to COBOL programs, developers find it risky to do so. There is a perceived larger "blast radius" associated with any change, driven by COBOL's monolithic structure and minimal documentation. COBOL developers told us:

> Before I add to a COBOL program, I spend 2-3 days manually mapping the data flows within my program to better understand the potential impact of my change. And even then, I do not always know the full impact.

> We don't have much functional documentation or much insight about the program. So it takes a while to understand the current program and propose a new change. I have to try to comb through the code line by line to understand the impact of my change. I mean it takes time, but there is no other option. 

### The kids are alright...or are they?

It is well documented that the average age of COBOL developers is around 60 years, with estimates of 10% of the workforce retiring each year. Few universities teach COBOL in their computer science curriculum. Both of these forces together creates a shortage of COBOL experts. 

We were lucky to get in touch with younger COBOL programmers, both at one of the universities that still teaches it (Northern Illinois University) and at companies across industries. Here's what we heard:

> The interface and current standard for building, testing, and managing COBOL applications called the "green screen" is highly complex and unintuitive. It is not like modern programming in VS Code. It requires memorizing extensive commands to just get started, and is a major barrier for entering the COBOL space.

> I've seen jokes where people are like, if you want a COBOL program to write "Hello World," it's like 50-70 lines. It's just a lot to get everything set up and onboard into.

What we learned is that understanding the syntax of COBOL is not the hard part, but rather it is getting up to speed on existing COBOL systems without the guidance of the engineers who wrote it to begin with. Maintaining 40+ year old codebases with minimal documentation and limited confidence on the impact of changes can be taxing. And even more taxing when the standard tooling around modern programming languages (e.g., IDEs, debuggers, Git) don't exist with COBOL and mainframe development.

## [What do banks do about this all...]

[Either you are on a vendor core or you have your own]

[If you have your own, the rip and replace is sitll hard. SIs have to comb through this pretty manually]

[If you have vendor core, you are beholden to their upgrade cycles.]

## [Opportunities for AI]