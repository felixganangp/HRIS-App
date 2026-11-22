import { Employee, EMPLOYEE_GROUPS } from '../models/employee.model';

const FIRST_NAMES = [
  'Muhammad',
  'Ahmad',
  'Citra',
  'Dewi',
  'Eko',
  'Fajar',
  'Gita',
  'Hendra',
  'Indah',
  'Joko',
  'Kartika',
  'Lukman',
  'Maya',
  'Nugroho',
  'Olivia',
  'Putra',
  'Qori',
  'Rizky',
  'Siti',
  'Taufik',
  'Utami',
  'Vina',
  'Wahyu',
  'Xena',
  'Yusuf',
  'Zahra',
  'Arif',
  'Bella',
  'Candra',
  'Dian',
  'Erlangga',
  'Fitri',
  'Galih',
  'Hana',
  'Irfan',
  'Julia',
  'Kevin',
  'Lestari',
  'Felix',
  'Nadia',
];

const LAST_NAMES = [
  'Pratama',
  'Santoso',
  'Wijaya',
  'Kusuma',
  'Saputra',
  'Hidayat',
  'Nugraha',
  'Siregar',
  'Setiawan',
  'Permata',
  'Ramadhan',
  'Purnama',
  'Lestari',
  'Sari',
  'Wibowo',
  'Utomo',
  'Gunawan',
  'Hartono',
  'Halim',
  'Susanto',
  'Kurniawan',
  'Rahmawati',
  'Handayani',
  'Prasetyo',
  'Firmansyah',
  'Maulana',
  'Fauzi',
  'Hakim',
  'Tanjung',
  'Nasution',
];

export function generateInitialEmployees(count: number = 108): Employee[] {
  const employees: Employee[] = [];
  const usedUsernames = new Set<string>();

  for (let i = 0; i < count; i++) {
    const firstName = FIRST_NAMES[i % FIRST_NAMES.length];
    const lastName = LAST_NAMES[(i * 7 + 3) % LAST_NAMES.length];
    const baseUsername = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;
    let username = baseUsername;
    let suffix = 1;

    while (usedUsernames.has(username)) {
      username = `${baseUsername}${suffix}`;
      suffix++;
    }
    usedUsernames.add(username);

    const email = `${username}@nusantaratech.co.id`;

    const birthYear = 1980 + (i % 23);
    const birthMonth = (i * 3) % 12;
    const birthDay = 1 + ((i * 5) % 28);
    const birthDate = new Date(birthYear, birthMonth, birthDay, 9, 0, 0);

    const salaryBase = 6500000 + ((i * 1350000) % 28500000);
    const basicSalary = Math.round(salaryBase / 50000) * 50000;

    const statusRoll = i % 10;
    const status: 'Active' | 'Inactive' | 'Probation' =
      statusRoll < 7 ? 'Active' : statusRoll < 9 ? 'Probation' : 'Inactive';

    const group = EMPLOYEE_GROUPS[i % EMPLOYEE_GROUPS.length];

    const descYear = 2024 + (i % 3);
    const descMonth = (i * 2) % 12;
    const descDay = 1 + ((i * 4) % 27);
    const descHour = 8 + (i % 9);
    const descMinute = (i * 15) % 60;
    const description = new Date(descYear, descMonth, descDay, descHour, descMinute, 0);

    employees.push({
      username,
      firstName,
      lastName,
      email,
      birthDate,
      basicSalary,
      status,
      group,
      description,
    });
  }

  return employees;
}
