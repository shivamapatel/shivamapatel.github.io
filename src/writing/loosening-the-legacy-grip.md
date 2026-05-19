---
title: Loosening the Legacy Grip in Financial Services
date: 2026-05-10
description: Learnings from diving into core banking modernization
---

## Introduction

My time at Capital One prior to business school acquainted me with legacy core banking infrastructure. "Core banking infrastructure" refers to the systems that power critical bank activities such as managing accounts and customers, processing deposits, issuing all types of loans, and reporting for financial and regulatory use cases.

"Legacy" refers to the fact that many of these systems were originally written in COBOL, or **CO**mmon **B**usiness-**O**riented **L**anguage, a programming language created in the 1950s. Engineers trained in it are approaching retirement, and many universities no longer teach it, creating a dearth of experts who understand core banking systems. Besides being written in an aging language, these core banking systems often operate in batch cycles and are monolithic. This poses challenges when banks want to integrate their cores with other modern pieces of technology, which are often cloud-based, modular, and real-time. 

It should be no surprise then that bank executives increasingly view legacy core banking systems as rate-limiters to innovation. Banks spend significant resources to modernize these systems, yet see limited success. Geoff Hudson-Searle (former Citibank executive) estimates that [75% of all COBOL rewrite projects have resulted in failure](https://freedomafterthesharks.com/2016/06/27/exactly-what-is-cobol-and-why-is-cobol-still-a-widely-used-language-in-it/). When they do succeed, they are expensive: Commonwealth Bank of Australia took [5 years and $750M to replace and modernize](https://www.reuters.com/article/technology/banks-scramble-to-fix-old-systems-as-it-cowboys-ride-into-sunset-idUSKBN17C0CN/?utm_source=chatgpt.com) its core banking platform, requiring the help of Accenture and SAP. 

When I got to Stanford, I wanted to better understand why these transformations are so painful, and whether the recent advances in large language models could alleviate some of the pain associated with legacy cores, loosening the legacy grip. The following is a narrative gleaned through research and 30+ conversations with COBOL developers, bank IT executives, and systems integrators. 

## Chesterton's Fence

![Chesterton's Fence](https://sproutsschools.com/wp-content/uploads/2023/05/Intro-to-Chesterton.jpeg)

G.K. Chesterton, an English writer during the 20th century, has a quote in one of his short stories that defines where we start: 

> There exists in such a case a certain institution or law; let us say, for the sake of simplicity, a fence or gate erected across a road. The more modern type of reformer goes gaily up to it and says, "I don't see the use of this; let us clear it away." To which the more intelligent type of reformer will do well to answer: "If you don't see the use of it, I certainly won't let you clear it away. Go away and think. Then, when you can come back and tell me that you do see the use of it, I may allow you to destroy it." 

The lesson: don't remove a fence until you know why it was put up in the first place. As such, I began with a curiosity about COBOL's origin story and how it reached scale in financial services.

### "English is the hottest **~old~** programming language"

COBOL emerged in the late 1950s as a response to the following question: *how do we make programming accessible to non-technical business managers?* Grace Hopper, a computer scientist known for developing the first compiler, believed that potential business users of technology were alienated by programming languages that resembled mathematics, like FORTRAN and ALGOL. Her thesis was that the mathematical, unintuitive syntaxes of these other languages were slowing enterprise adoption of computing altogether. 

Arriving at the same insight, computer manufacturers like IBM and Honeywell, and the government, sought to design English-like business programming languages for their machines. Wanting to get ahead of arbitrary uniqueness, the Pentagon organized the Conference on Data Systems Languages (or CODASYL) with the goal of creating **one** common business programming language that would work across all machines. At these meetings, Grace Hopper played a key role in establishing COBOL as the solution. 

The CODASYL report that contained the first full version of COBOL says: *the COBOL system allows the user to prepare his specifications for the problem solution in the language most natural to him -- namely English.* COBOL was designed so that its syntax resembled grammatically correct English. Interestingly, this resemblance was only one-way: while COBOL statements were technically valid English sentences, not all English sentences were valid COBOL code (maybe where we are with coding LLMs today...). Still, it was believed this similarity to English would enhance readability for business users, a belief so strong that early versions of COBOL did not contain the capacity to leave comments, since it was a "self-documenting" language. 

### COBOL everywhere you can't see

COBOL's readability for business audiences played a role in its widespread adoption, as did a few other factors. First, because COBOL was standardized across hardware providers, applications written in COBOL were portable across machines, increasing their reach. Secondly, the government's involvement in the creation of COBOL helped fuel its adoption in federal, financial, and healthcare sectors. And thirdly, COBOL was optimized for batch processing transactions at scale. COBOL was tightly coupled with IBM Z mainframes, leading to efficiency in handling massive batches of data faster than other languages. 

Beyond just efficiency, COBOL handles calculations with greater precision than most programming languages driven by prioritizing decimal arithmetic over floating-point arithmetic. This precision matters when you are processing trillions of dollars in industries like insurance, banking, and healthcare.

Fast forward to today, there is an astonishing estimate of 800 billion lines of COBOL in daily production use worldwide. Within financial services specifically, COBOL is estimated to power 95% of all ATM transactions and 80% of in-person credit card swipes. Tell me that isn't scale. 

## Challenges with COBOL Today

<figure>
<img src="https://hunterstrainingassociates.com/images/ispf6_25.gif" alt="Green Screen">
<figcaption>An image of a COBOL program written on the "green screen," a mainframe interface used to write and run COBOL programs</figcaption>
</figure>

### English, the double-edged sword

COBOL's English-likeness was meant to make programs readable, but it added surface complexity without reducing logical complexity. Every operation in COBOL is verbose, and the verbosity makes the underlying logic harder to find, not easier.

Additionally, developers do not see the need to invest in documentation given the language's resemblance to English. Ironically, this lack of documentation has led to limited interpretability of COBOL programs today. A developer we talked to summarized this well:

> Documentation, if it exists, repeats what the code says since COBOL technically uses English style commands. Critically, however, there is no documentation that explains why a program behaves the way it does, in other words, the business logic. There is no contextual documentation either on how a program relates to others which makes working in COBOL codebases challenging today.

### "If it ain't broke, don't fix it"

Given COBOL's efficiency in batch processing at scale and high reliability, many organizations did not want to "rock the boat" and modify something that already was working. Many applications went largely untouched for 30+ years. Multiple developers noted that without investment in refactoring and documentation, the programs evolved into *complex, highly intertwined balls of yarn*. A few quotes from developers summarized this well:

> These programs have been around longer than I have, and after decades of tiny changes -- ten, twenty, thirty, forty years -- they've grown massive. 

> COBOL programs are excessively complex. I've seen codebases where there are  millions of insurance policies within it, some of which are completely defunct now from a business perspective. Yet nobody did the work of scrubbing them from the codebase because it all just worked, but now it is even harder to navigate.

When they do need to make changes to COBOL programs, developers find it risky to do so. There is a perceived larger "blast radius" associated with any change, driven by COBOL's monolithic structure and minimal documentation. COBOL developers told us:

> Before I add to a COBOL program, I spend 2-3 days manually mapping the data flows within my program to better understand the potential impact of my change. And even then, I do not always know the full impact.

> We don't have much functional documentation or much insight about the program. So it takes a while to understand the current program and propose a new change. I have to try to comb through the code line by line to understand the impact of my change. I mean it takes time, but there is no other option. 

### The kids are alright...or are they?

It is well documented that the average age of COBOL developers is around 60 years, with estimates of 10% of the workforce retiring each year. Few universities teach COBOL in their computer science curriculum. Both of these forces together creates a shortage of COBOL experts. 

We were lucky to get in touch with younger COBOL programmers, both at one of the universities that still teaches it ([Northern Illinois University](https://techchannel.com/education-skills-and-training/niu-mainframe-students/)) and at companies across industries. Here's what we heard:

> The interface and current standard for building, testing, and managing COBOL applications called the "green screen" is highly complex and unintuitive. It is not like modern programming in VS Code. It requires memorizing extensive commands to just get started, and is a major barrier for entering the COBOL space.

> I've seen jokes where people are like, if you want a COBOL program to write "Hello World," it's like 50-70 lines. It's just a lot to get everything set up and onboard into.

What we learned is that understanding the syntax of COBOL is not the hard part, but rather it is getting up to speed on existing COBOL systems without the guidance of the engineers who wrote them to begin with. Maintaining 40+ year old codebases with minimal documentation and limited confidence on the impact of changes can be taxing. And even more taxing when the standard tooling around modern programming languages (e.g., IDEs, debuggers, Git) don't exist with COBOL and mainframe development.

## Whose Code Is It Anyway?

<figure>
<img src="https://www.kansascityfed.org/images/Chart1-PSRB24-3.27.24.width-725.png" alt="Core Banking Vendors">
<figcaption>Sources: American Bankers Association, Chilingerian and Schafer (2020), and Callahan &amp; Associates</figcaption>
</figure>

Turning our attention back to banks, the core banking system market is highly concentrated as seen in the chart above. The "Big Three" core providers: Fiserv, FIS, and Jack Henry have over 70% market share in banks, according to a 2022 American Bankers Association survey. Each of the Big Three has grown its footprint via M&A over the last three decades and evolved into a "one stop shop" for banks. Beyond core banking, they offer payment processing for merchants, card network services, and more. 

As a result of the breadth and depth of what they offer, core banking systems are highly sticky. The same survey found that 61% of banks have been with their core provider for more than 10 years. Yet, almost half of banks running on the Big Three report being dissatisfied with their core. The complaints include slow customer support, weak integration with third parties and modern software, and limited data maintenance. The Big Three are aware of this and are focused on modernization: moving to the cloud, modernizing their COBOL codebases to offer quicker support, and more. Yet, because cores are sticky and the market is consolidated, these initiatives move on the vendor's timeline, not the bank's. Some banks have tried to adopt more modern core providers such as Thought Machine (founded in 2014, backed by J.P. Morgan Chase) in new, greenfield parts of their businesses, but these projects ultimately have not scaled due to the difficulty of rip and replacing the original core.

**Another factor compounds a bank's inability to leave: control over source code**. Some contracts stipulate that core providers retain sole ownership over the core banking system's source code, including modifications and enhancements. In such instances, a bank running on Fiserv, FIS, or Jack Henry isn't really maintaining a COBOL codebase themselves. It is renting one. 

What we observed is that ownership over source code is typically vendor-agnostic, but rather determined by size of bank. It is contract by contract. A smaller cohort of banks, typically the largest, have either built their own core in-house or negotiated meaningful source code access with their provider. But the sheer majority of banks, including many community banks, are reliant on the Big Three, renting their COBOL codebases. 

Control over source code meaningfully impacts how a bank thinks about using AI to maintain and modernize its core. 

## Where AI Actually Fits

### I got the ~~power~~ COBOL code 

In February 2026, Anthropic published a blog post: [How AI Helps Break The Cost Barrier To COBOL Modernization](https://claude.com/blog/how-ai-helps-break-cost-barrier-cobol-modernization). They make the case that Claude can automate the hardest parts of COBOL modernization: understanding systems with minimal documentation, complex business logic, and dependencies that evolved over decades. *With AI, teams can modernize thier COBOL codebase in quarters instead of years.* 

This is not just hyperbole. Banks that have access to their COBOL source code are seeing meaningful lift from AI. [Morgan Stanley built DevGen.AI](https://www.wsj.com/articles/how-morgan-stanley-tackled-one-of-codings-toughest-problems-4f465959#), which takes legacy COBOL code and turns it into explanatory specs that developers can use to understand what a program does and how it relates to others. As of a year ago, it has reviewed over 9M+ lines of code and saved developers over 280K hours internally. 

This enhanced understanding of COBOL cores is what leads to eventual modernization. One top 10 bank technology reflected to me: 

> If we could feed or train a LLM on our COBOL source code, and it would generate business, technical, and non-functional requirements that a modern core version would need to have, that would be gamechanging. We could then hand off those requirements to developers supercharged with AI and save significant modernization effort.

A systems integrator who worked on a COBOL modernization for a 401(k) program helped prove the point. 

> I modernized 10M lines of code from COBOL into Java. I would literally go in, manually look at the COBOL code, spend a long time trying to translate the business functionality, check with users if it was the right functionality, hand requirements over to a Java developer, and then manually check if the two systems produced similar results. I would do this function by function, until it was over...thank God I no longer do COBOL modernizations.

This was in the late 2010s, pre-LLMs. This systems integrator was quite excited by AI's ability to speed up understanding of COBOL systems and requirements-gathering, and was hopeful that this project done today could be completed much faster than it really took (~7 years). 

### If you don't have the COBOL code...

For banks that do not own their core source code, the above does not apply. You can not feed your core into a LLM if your contract says the source code, and any modifications, belong to the vendor. 

One option is to rip out the Big Three and migrate to a modern provider like Thought Machine. As mentioned above, however, this is a massive undertaking with a mixed track record. Commonwealth Bank of Australia, which I cited at the top of this post, spent over $750M and five years getting it done. J.P. Morgan Chase announced Thought Machine would replace its U.S. Retail Banking core in 2021, with no news or development publicly since. Especially given that the Big Three are themselves investing in modernization, the cost-benefit of rip and replace for any bank is hard to justify. 

The more promising path for those 'renting' their COBOL cores is to stop trying to change their cores, and do more *around* it. A CTO at a community bank framed it this way to me: 

> We run on Fiserv Premier. We do zero internal development work on the core and will wait for Fiserv to modernize themselves. They plan to move to the cloud, better integrate with third party fintechs, and modernize their database. In the meantime, what we are focused on is capturing the data that sits within the core in our own data lake, building our own system of record which will allow us to rely on Fiserv less and less. We feed this data into third party applications that are best-in-breed for different purposes, such as Alloy for transaction fraud monitoring. 

In other words, keep your core as is. Push data that is within the core (e.g., general ledger data) into a modern data lake, and integrate with best-of-breed vendors for various workflows: account opening, fraud, underwriting, payments. These vendors are often AI-native by default: for example, Alloy not only uses predictive ML to assign risk scores to transactions, but it also has built an agent to help automate end-to-end fraud investigation workflows. Secondly, by building out an internal data lake and system of record, banks can start experimenting with opportunities for greater customer segmentation, scoring, and personalization across mediums. 

## Conclusion

When I started diving into this topic, I assumed the decision to modernize COBOL core banking systems was a technical one. After many conversations with experts, I think the technical question is the wrong one to start with. What to do about your COBOL core banking system depends on whether or not you own the keys to it. For owners of these systems, AI dramatically lowers the cost of understanding legacy cores, which is what makes modernization so expensive in the first place. For renters of these systems, opportunities to modernize show up in the architecture around the core, such as AI-based fraud monitoring and customer servicing. Banks' modernization options are ultimately shaped by which side of the ownership line they sit on, and by what AI is actually allowed to do for them. 

*Special thanks to my classmates [Ameya Shiva](https://www.linkedin.com/in/ameya-shiva) and [Lisa Zhou](https://www.linkedin.com/in/lisa-zhou-05) for their help, friendship, and invaluable contributions to this research.* 