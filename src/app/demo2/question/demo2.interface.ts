export interface Person {
  /** 身份证 */
  id: string;
  /** 血型 */
  bloodType: string;
  /** 姓名 */
  name: string;
  /** 地址 */
  address: string;
}

export interface UpdatePerson {
  /** 身份证 */
  id: string;
  /** 姓名 */
  name: string;
  /** 地址 */
  address: string;
}
