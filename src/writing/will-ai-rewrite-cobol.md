---
title: Loosening the Legacy Grip in Financial Services
date: 2026-05-10
description: Findings from research done across two quarters at Stanford
---

## Introduction

My time at Capital One prior to business school acquainted me with legacy core banking infrastructure. When I say "core banking infrastructure", I am referring to the systems that power critical bank activities such as: 
- Account and customer management
- Deposit processing
- Loan processing (across product types, including credit cards)
- Finance, accounting, and reporting

And when I say "legacy," I am referring to the fact that many of these systems were written in COBOL, or COmmon Business-Oriented Language, a programming language created several decades ago in the 1950s. Many engineers fluent in COBOL are approaching retirement, and COBOL is no longer taught in many computer science programs, creating a dearth of experts who understand these systems. Besides being written in an archaic language, these core banking systems often operate in batch cycles and are monolithic, posing challenges in integrating with other modern pieces of technology, which are often cloud-based, modular, and operate in real-time. *Legacy core banking infrastructure is increasingly becoming the rate limiter to innovation at banks.* 

Bank executives realize this and are spending significant resources to modernize core banking systems, with limited success. Geoff Hudson-Searle (former Citibank executive) estimates that 75% of all COBOL rewrite projects have resulted in failure. When they do succeed, they are expensive: Commonwealth Bank of Australia took 5 years and $750M to replace and modernize its core banking platform, requiring the help of Accenture and SAP. 

During my second year at Stanford, over the course of 30+ conversations with COBOL developers, bank IT executives, and systems integrators, I set out to answer three main questions:
- How did COBOL begin and evolve over time?
- What makes COBOL based systems so hard to maintain and modernize, and is the effort even worth it?
- Can advances in Generative AI relieve the pain associated with core banking infrastructure and loosen the legacy grip?

## Technical Challenges Associated with COBOL 