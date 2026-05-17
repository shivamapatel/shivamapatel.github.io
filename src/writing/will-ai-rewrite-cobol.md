---
title: Loosening the Legacy Grip in Financial Services
date: 2026-05-10
description: Learnings from diving into core banking modernization
---

## Introduction

My time at Capital One prior to business school acquainted me with legacy core banking infrastructure. "Core banking infrastructure" refers to the systems that power critical bank activities such as: 
- Managing accounts and customers
- Processing deposits 
- Issuing all types of loans
- Reporting for financial and regulatory use cases

"Legacy" refers to the fact that many of these systems were originally written in COBOL, or &**CO**mmon **B**usiness-**O**riented **L**anguage, a programming language created in the 1950s. Engineers trained in COBOL are approaching retirement, and many universities no longer teach the language, creating a dearth of experts who understand core banking systems. Besides being written in an aging language, these core banking systems often operate in batch cycles and are monolithic. This poses challenges when banks want to integrate their cores with other modern pieces of technology, which are often cloud-based, modular, and operate in real-time. 

It should be no surprise then that bank executives increasingly view legacy core banking systems as rate-limiters to innovation. Banks are spending significant resources to modernize these systems, yet see limited success. Geoff Hudson-Searle (former Citibank executive) estimates that 75% of all COBOL rewrite projects have resulted in failure. When they do succeed, they are expensive: Commonwealth Bank of Australia took 5 years and $750M to replace and modernize its core banking platform, requiring the help of Accenture and SAP. 

When I got to Stanford, I wanted to better understand why these transformations are so painful, and whether recent advances with large language models could alleviate some of the pain associated with legacy cores, loosening the legacy grip. The following is a narrative of my approach and learnings over the course of 30+ conversations with COBOL developers, bank IT executives, and systems integrators. 

## Chesterton's Fence

G.K. Chesterton, an English writer during the 20th century, has a quote in one of his short stories that defines where we start: 

> There exists in such a case a certain institution or law; let us say, for the sake of simplicity, a fence or gate erected across a road. The more modern type of reformer goes gaily up to it and says, "I don't see the use of this; let us clear it away." To which the more intelligent type of reformer will do well to answer: "If you don't see the use of it, I certainly won't let you clear it away. Go away and think. Then, when you can come back and tell me that you do see the use of it, I may allow you to destroy it." 

The lesson: don't remove a fence until you know why it was put up in the first place. I began with a curiosity about COBOL's origin story and how it reached scale in financial services.

### "English is the hottest **~old~** programming language"

COBOL emerged in the late 1950s as a response to the following question: *how do we make programming accessible to non-technical business managers?* Grace Hopper, a computer scientist known for developing the first compiler, believed that potential business users of technology were alienated by programming languages that resembled mathematics, like FORTRAN and ALGOL. Her thesis was that the mathematical nature of these other languages was slowing enterprise adoption of computing altogether. 

Arriving at the same insight, computer manufacturers like IBM, Honeywell, and the government, sought to design English-like business programming languages for their machines. Wanting to get ahead of arbitrary uniqueness, the Pentagon organized the Conference on Data Systems Languages (or CODASYL) with the goal of creating **one** common business programming language that would work across all machines. At these meetings, Grace Hopper played a key role in establishing COBOL as the solution. 

The CODASYL report that contained the first full version of COBOL says: *The COBOL system allows the user to prepare his specifications for the problem solution in the language most natural to him -- namely English.* COBOL was designed so that its syntax resembled grammatically correct English. Interestingly, this resemblance was only one-way: while COBOL statements were technically valid English sentences, not all English sentences were valid COBOL code. Still, it was believed this similarity to English would enhance readability for business users, a belief so strong that early versions of COBOL did not contain the capacity to leave comments, since it was a "self-documenting" language. 

### COBOL everywhere you can't see

COBOL's readability by business audiences played a role in its widespread adoption, as did a few other factors. First, because COBOL was a standardized language across hardware providers, applications written in COBOL were portable, increasing their reach. Secondly, the government's involvement in the creation of COBOL helped fuel its adoption in federal, financial, and healthcare sectors. And thirdly, COBOL was optimized for batch processing transactions at scale. COBOL was tightly coupled with IBM Z mainframes, leading to efficiency in handling massive batches of data faster than other languages. 

Fast forward to today, there is an astonishing estimate of 800 billion lines of COBOL in daily production use worldwide. Within financial services specifically, COBOL is estimated to power 95% of all ATM transactions and 80% of in-person credit card swipes. Tell me that isn't scale. 

## Challenges

[To be continued]