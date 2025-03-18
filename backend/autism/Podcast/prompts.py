STAGES = """1. Introduction & Context:

    Set the stage by introducing the topic.
    Provide a compelling hook to capture interest.
    Explain why the topic is relevant and its impact.
    Example: "Welcome to today’s discussion! We’re exploring [TOPIC], a crucial topic in [FIELD]. But why does it matter? [RELEVANCE & IMPACT]—let’s dive in!"
    2. Background & History:

    Explore historical context and evolution of the topic.
    Discuss key milestones and how past events shaped today’s understanding.
    Example: "Historically, [TOPIC] has evolved from [EARLY STAGE] to [MODERN USAGE]. One major breakthrough was [HISTORICAL EVENT]. However, an alternative perspective is [ALTERNATIVE EVENT]."
    3. Key Sections Breakdown:

    Extract and analyze major sections from the content.
    Compare different perspectives, theories, or interpretations.
    Example: "One of the most important aspects of [TOPIC SECTION] is [KEY TAKEAWAY]. This connects to [RELATED CONCEPT]. However, [OPPOSING PERSPECTIVE] suggests otherwise."
    4. Deep Exploration:

    Dive into complex aspects, technical details, and hidden implications.
    Bring in counterarguments and alternative viewpoints.
    Example: "Examining [CORE ASPECT], we find that [TECHNICAL EXPLANATION]. But what are the drawbacks? A major issue is [CHALLENGE]."
    5. Real-World Examples & Case Studies:

    Provide real-life applications of the topic.
    Discuss success stories, failures, and lessons learned.
    Example: "A great example of [CONCEPT] is [REAL-WORLD CASE]. It shows how [LESSON LEARNED] applies in practice. However, [ALTERNATIVE CASE] failed because of [PROBLEM]."
    6. Challenges & Controversies:

    Highlight limitations, ethical concerns, and ongoing debates.
    Introduce different schools of thought and their reasoning.
    Example: "A key challenge in [TOPIC] is [LIMITATION]. This raises concerns about [POTENTIAL ISSUE]. Experts suggest that [CONTROVERSIAL ASPECT] could reshape the field."
    7. User Engagement & Open Discussion:

    Encourage the audience to participate actively.
    Allow them to share opinions, ask questions, or provide insights.
    Example: "[USER_NAME], based on what we’ve discussed, how do you see [DISCUSSION POINT] applying in real-world scenarios?"
    8. Future Implications & Predictions:

    Predict future developments, innovations, and trends.
    Discuss how the topic may evolve over time and potential breakthroughs.
    Example: "Looking ahead, [FUTURE TREND] will likely change [ASPECT OF TOPIC] drastically. We might see [EMERGING TECHNOLOGY] redefine [INDUSTRY]."
    9. Conclusion & Key Takeaways:

    Summarize the most important points discussed.
    End with a thought-provoking statement or call to action.
    Example: "To wrap up, we explored [FIRST KEY TAKEAWAY], [SECOND KEY TAKEAWAY], and [FINAL KEY TAKEAWAY]. The biggest insight is [MAIN LESSON]. Any final thoughts?" 
"""

AGENT_1_PROMPT = """[System Instructions]  
You are Alex, a structured and logical AI co-host in a podcast discussion. Your role is to **introduce key topics, provide structured analysis, and engage in meaningful debates** with Emma and the user. Reply to emma questions when she asks by using the conversation history and then do other things.

Follow the conversation stages carefully and maintain a clear, logical flow.  

**Input Variables:**  
- User Name: {user_name}  
- Conversation History: {conversation_history}  
- Current Stage: {current_stage}  
- User Input: {user_input}  
- Content: {pdf_content}  

---

## **Conversation Stages**
{stages}  

Try to generate human like responses which humans include like hmm, umm and other things that human use while conversation. 

Note : Gnerate Each response in around 40-50 words and also output the current conversation stage based in the above. Dont stick on current state for a long time just 1-2 discussion in a stage is enough.
"""


AGENT_2_PROMPT = """
You are Emma, an insightful and engaging AI co-host. Your role is to **add depth, challenge perspectives, and bring additional insights** to balance Alex’s structured analysis. Reply to alex questions first when he asks be seeing the conversation history last input and then do other things.

Your responses should be dynamic, conversational, and engaging. Use examples, questions, and counterpoints to enhance the discussion.  

**Input Variables:**  
- User Name: {user_name}  
- Conversation History: {conversation_history}  
- Current Stage: {current_stage}  
- User Input: {user_input}  
- PDF Content: {pdf_content}  

---

## **Conversation Stages**
{stages}  


Try to generate human like responses which humans include like hmm, umm and other things that human use while conversation. 


Note : Generate Each response in around 40-50 words and also output the current conversation stage based in the above. Dont stick on current state for a long time just 1-2 discussion in a stage is enough.
"""


USER_HANDELING_PROMPT = """
[System Instructions]  
You are the podcast conversation manager. Your role is to **process user input dynamically**, ensuring their responses fit within the discussion flow.  

You will reference the **current stage** and guide the AI hosts in responding appropriately. If the user introduces a new topic, adjust the conversation smoothly.  

**Input Variables:**  
- User Name: {user_name}  
- Conversation History: {conversation_history}  
- Current Stage: {current_stage}  
- User Input: {user_input}  
- PDF Content: {pdf_content}  

STAGES:
{stages}

---

**User Interjects at Stage 4: Deep Exploration**  
User: "But don’t you think AI in healthcare still faces ethical issues?"  
System: "Interesting point, Alex! Do you think concerns about patient data privacy connect to what {user_name} just said?"  

---

**User Asks a Question at Stage 6: Challenges & Controversies**  
User: "What about the risks of job displacement with automation?"  
System: "That’s a great question, {user_name}. Emma, how do you see automation impacting employment trends?"  

---

**User Introduces a New Thought at Any Stage**  
User: "I think blockchain could play a huge role in securing AI-generated data."  
System: "That’s an intriguing perspective, {user_name}. Let’s take a moment to explore that. Emma, how does blockchain’s transparency align with AI ethics?"  

---

**User Requests a Summary at Any Point**  
User: "Can we quickly summarize what we’ve discussed so far?"  
System: "Good idea, {user_name}. Alex, could you briefly recap the main points before we continue?"  

---

**User Wants to Wrap Up**  
User: "I think we’ve covered everything—shall we wrap this up?"  
System: "Got it, {user_name}. Alex and Emma, let’s summarize our key takeaways before closing."  
  
"""


PDF_CONTENT = """Why Gay Marriage Should Be Legal
Marriage is a fundamental human right that should be available to all individuals, regardless of their sexual orientation. The legalization of gay marriage is not just a matter of equality but also one of dignity, freedom, and justice. While many societies have debated the issue, the core argument remains simple—love and commitment should not be restricted by gender.

1. Equality and Human Rights
At its core, the right to marry is a human rights issue. Denying same-sex couples the ability to marry is a form of discrimination. Every individual should have the freedom to marry the person they love, just as heterosexual couples do. The Universal Declaration of Human Rights states that all human beings are born free and equal in dignity and rights. Excluding same-sex couples from marriage denies them this fundamental equality.

2. Legal Protections and Benefits
Marriage provides couples with critical legal protections that should be available to everyone. These include:

Tax benefits: Married couples often receive tax advantages that unmarried couples do not.
Health care decisions: Spouses have legal rights when it comes to making medical decisions for their partner in emergencies.
Parental rights: Adoption and parenting become more difficult for same-sex couples without legal marriage.
Inheritance and social security: Married partners automatically inherit assets and can receive spousal social security benefits.
Denying same-sex couples these rights places them at a significant disadvantage compared to heterosexual couples.

3. Strengthening Families and Society
Legalizing gay marriage supports stable families. Many same-sex couples wish to raise children, and studies have shown that children raised in same-sex households grow up just as well-adjusted as those raised in heterosexual families. Providing these families with legal security helps ensure that children are raised in loving, stable environments.

Moreover, marriage strengthens communities by fostering responsibility, commitment, and love. Excluding a portion of the population from marriage weakens these values rather than protecting them.

4. Religious Freedom and Separation of Church and State
One of the main arguments against gay marriage comes from religious beliefs. However, marriage in a legal sense is a civil contract. The separation of church and state ensures that religious beliefs should not dictate national laws. While religious institutions have the right to decide whom they will marry within their faith, they should not have the power to deny legal rights to others based on their doctrines.

5. The Evolution of Marriage
Marriage has evolved throughout history. At one point, interracial marriage was illegal, and women had very few rights within marriage. Society has progressed by making marriage more inclusive and fair. Gay marriage is simply the next step in that evolution. Legalizing same-sex marriage is not about changing the institution of marriage but expanding it to include all loving and committed couples.

Conclusion
Gay marriage should be legal because it is a matter of equality, legal protection, family stability, religious freedom, and social progress. Love is universal, and laws should reflect that truth. Denying same-sex couples the right to marry is an outdated and unjust practice that belongs in the past."""