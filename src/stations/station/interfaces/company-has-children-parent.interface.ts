export interface CompanyHasChildrenParentInterface
{
    exec(companyId: string): Promise<boolean>;
}