import BankDetailsForm from "./BankDetailsForm";
import CashDetailsForm from "./CashDetailsForm";
import DebtorCreditorForm from "./DebtorCreditorForm";
import FixedAssetForm from "./FixedAssetForm";
import InvestmentForm from "./InvestmentForm";
import LoanForm from "./LoanForm";
import ExpenseForm from "./ExpenseForm";
import IncomeForm from "./IncomeForm";


export const getFormComponents = (selectedGroup) => {
  if (!selectedGroup) return { rightColumnForms: [] };

  const groupName = selectedGroup.label?.toLowerCase() || "";
  const groupType = selectedGroup.groupType?.toLowerCase() || "";

  const rightColumnForms = [];


  if (groupName.includes("cash-in-hand") || groupName.includes("cash in hand")) {
    return { rightColumnForms: [] };
  }


  if (groupName.includes("bank") || groupName.includes("account")) {
    rightColumnForms.push(
      <BankDetailsForm key="bank" selectedGroup={selectedGroup} />
    );
  }


  if (groupName.includes("cash") && !groupName.includes("cash-in-hand") && !groupName.includes("cash in hand")) {
    rightColumnForms.push(
      <CashDetailsForm key="cash" selectedGroup={selectedGroup} />
    );
  }


  if (groupName.includes("debtor") || groupName.includes("creditor")) {
    rightColumnForms.push(
      <DebtorCreditorForm key="debtor-creditor" selectedGroup={selectedGroup} />
    );
  }


  if (groupName.includes("fixed") || groupName.includes("asset")) {
    rightColumnForms.push(
      <FixedAssetForm key="fixed-asset" selectedGroup={selectedGroup} />
    );
  }


  if (groupName.includes("investment")) {
    rightColumnForms.push(
      <InvestmentForm key="investment" selectedGroup={selectedGroup} />
    );
  }


  if (groupName.includes("loan")) {
    rightColumnForms.push(
      <LoanForm key="loan" selectedGroup={selectedGroup} />
    );
  }


  if (groupType === "expense" || groupName.includes("expense")) {
    rightColumnForms.push(
      <ExpenseForm key="expense" selectedGroup={selectedGroup} />
    );
  }


  if (groupType === "income" || groupName.includes("income") || groupName.includes("revenue")) {
    rightColumnForms.push(
      <IncomeForm key="income" selectedGroup={selectedGroup} />
    );
  }

  return { rightColumnForms };
};

export const getVisibleTabs = (selectedGroup) => {
  if (!selectedGroup) return ["license", "upi"];

  const groupName = selectedGroup.label?.toLowerCase() || "";
  const groupType = selectedGroup.groupType?.toLowerCase() || "";

  if (groupName.includes("cash-in-hand") || groupName.includes("cash in hand")) {
    return [];
  }

  const tabs = ["license", "upi"];

  if (!groupName.includes("cash") && !groupName.includes("bank")) {
    tabs.unshift("gst");
  }

  if (groupName.includes("debtor") || groupName.includes("creditor") || groupName.includes("party")) {
    tabs.push("contact");
  }

  return tabs;
}; 