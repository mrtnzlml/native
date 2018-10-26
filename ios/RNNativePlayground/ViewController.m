#import <RNKiwiMobile/RNKiwiMobile.h>
#import "ViewController.h"
#import "City.h"

@interface ViewController () <UIGestureRecognizerDelegate, RNKiwiViewControllerFlowDelegate, RNKiwiCurrencyManager, RNKiwiTranslationProvider>

@property (nonatomic, strong) RNKiwiViewController *activeVc;
@property (weak, nonatomic) IBOutlet UITextField *startDateSelectionTextField;
@property (weak, nonatomic) IBOutlet UITextField *endDateSelectionTextField;

@end

@implementation ViewController

- (instancetype)initWithCoder:(NSCoder *)coder {
  self = [super initWithCoder:coder];
  
  if (self) {
    /**
     * In order to create bridge upfront, call this method before showing ViewController. Otherwise,
     * it's created at the runtime lazily
     */
    [[RNKiwiSharedBridge sharedInstance] initBridge];
  }
  return self;
}

-(UIToolbar *)customizeToolbar:(NSString *)dateType {
  UIToolbar *toolBar = [[UIToolbar alloc] initWithFrame:CGRectMake(0, 0, 320, 44)];
  [toolBar setTintColor:[UIColor grayColor]];
  
  UIBarButtonItem *startDoneBtn = [[UIBarButtonItem alloc] initWithTitle:@"Done"
                                                                   style:UIBarButtonItemStyleDone
                                                                  target:self
                                                                  action:@selector(selectedStartDate)];
  
  UIBarButtonItem *endDoneBtn = [[UIBarButtonItem alloc] initWithTitle:@"Done"
                                                                 style:UIBarButtonItemStyleDone
                                                                target:self
                                                                action:@selector(selectedEndDate)];
  
  UIBarButtonItem *pickerDoneBtn = [[UIBarButtonItem alloc] initWithTitle:@"Done"
                                                                    style:UIBarButtonItemStyleDone
                                                                   target:self
                                                                   action:@selector(selectedCity)];
  
  if ([dateType isEqual: @"end"]) {
    [toolBar setItems:[NSArray arrayWithObjects:endDoneBtn, nil]];
    return toolBar;
  } else if ([dateType isEqual: @"start"]) {
    [toolBar setItems:[NSArray arrayWithObjects:startDoneBtn, nil]];
    return toolBar;
  } else {
    [toolBar setItems:[NSArray arrayWithObjects:pickerDoneBtn, nil]];
    return toolBar;
  }
}

- (void)viewDidLoad{
  startDatePicker=[[UIDatePicker alloc] init];
  startDatePicker.datePickerMode = UIDatePickerModeDate;
  [self.startDateSelectionTextField setInputView:startDatePicker];
  
  endDatePicker=[[UIDatePicker alloc] init];
  endDatePicker.datePickerMode = UIDatePickerModeDate;
  [self.endDateSelectionTextField setInputView:endDatePicker];
  
  City *Prague = [[City alloc] initWithName:@"Prague" andId:@"aG90ZWxDaXR5Oi01NTMxNzM=“"];
  City *Brno = [[City alloc] initWithName:@"Brno" andId:@"aG90ZWxDaXR5Oi01NDIxODQ="];
  City *Barcelona = [[City alloc] initWithName:@"Barcelona" andId:@"aG90ZWxDaXR5Oi0zNzI0OTA="];
  
  dataArray=[[NSArray alloc] initWithObjects:Prague,Brno,Barcelona, nil];
  cityPicker = [[UIPickerView alloc] init];
  cityPicker.dataSource = self;
  cityPicker.delegate = self;
  [cityPicker setShowsSelectionIndicator:YES];
  [self.pickerTextField setInputView:cityPicker];
  
  [self.startDateSelectionTextField setInputAccessoryView:[self customizeToolbar:@"start"]];
  [self.endDateSelectionTextField setInputAccessoryView:[self customizeToolbar:@"end"]];
  [self.pickerTextField setInputAccessoryView:[self customizeToolbar:@"city"]];
  
}

- (void)viewDidAppear:(BOOL)animated{
  self.navigationController.navigationBar.hidden = YES;
  self.navigationController.interactivePopGestureRecognizer.delegate = self;
}

-(NSString *)selectedStartDate
{
  NSDateFormatter *dateFormatter =[[NSDateFormatter alloc] init];
  [dateFormatter setDateFormat:@"yyyy-MM-dd"];
  
  [self.startDateSelectionTextField resignFirstResponder];
  return self.startDateSelectionTextField.text=[NSString stringWithFormat:@"%@", [dateFormatter stringFromDate:startDatePicker.date]];
}

-(NSString *)selectedEndDate
{
  NSDateFormatter *dateFormatter =[[NSDateFormatter alloc] init];
  [dateFormatter setDateFormat:@"yyyy-MM-dd"];
  
  [self.endDateSelectionTextField resignFirstResponder];
  return self.endDateSelectionTextField.text=[NSString stringWithFormat:@"%@", [dateFormatter stringFromDate:endDatePicker.date]];
}

- (City *)selectedCity {
  [self.pickerTextField resignFirstResponder];
  self.pickerTextField.text=[dataArray objectAtIndex:[cityPicker selectedRowInComponent:0]].cityName;
  return [dataArray objectAtIndex:[cityPicker selectedRowInComponent:0]];
}

- (NSDictionary *)windowDimensions {
  CGRect windowRect = self.view.window.frame;
  return @{
           @"width": @(windowRect.size.width),
           @"height": @(windowRect.size.height)
           };
}



- (void)setActiveViewController:(RNKiwiViewController *)vc {
  __weak typeof(self) weakSelf = self;
  
  [vc setCurrencyFormatter:weakSelf];
  [vc setTranslationProvider:weakSelf];
  [vc setFlowDelegate:weakSelf];
  
  _activeVc = vc;
}

- (IBAction)presentNewHotelsView:(id)sender {
  
  RNKiwiViewController *vc = [[RNKiwiViewController alloc] initWithModule:@"NewKiwiHotels"
                                                        initialProperties:@{
                                                                            @"language": @"en",
                                                                            @"currency": @"EUR",
                                                                            @"lastNavigationMode": @"present",
                                                                            @"dimensions": [self windowDimensions],
                                                                            @"checkin": [self selectedStartDate],
                                                                            @"checkout": [self selectedEndDate],
                                                                            @"version": @"3.7.13-9d55ad66",
                                                                            @"cityName": [self selectedCity].cityName,
                                                                            @"cityId": [self selectedCity].cityId,
                                                                            @"roomsConfiguration": @[
                                                                                @{
                                                                                  @"adultsCount": @1,
                                                                                  @"children": @[
                                                                                      @{
                                                                                        @"age": @2
                                                                                        }
                                                                                      ]}
                                                                                ]
                                                                            }];
  
  [self setActiveViewController:vc];
  [[self navigationController] presentViewController:vc animated:YES completion:nil];
}

# pragma mark - UIPickerView DataSource Method
- (NSInteger)numberOfComponentsInPickerView:(UIPickerView *)pickerView
{
  return 1;
}

- (NSInteger)pickerView:(UIPickerView *)pickerView numberOfRowsInComponent:(NSInteger)component
{
  return [dataArray count];
}

# pragma mark - UIPickerView Delegate Method

- (NSString *)pickerView:(UIPickerView *)pickerView titleForRow:(NSInteger)row forComponent:(NSInteger)component
{
  return [dataArray objectAtIndex:row].cityName;
}

- (void)pickerView:(UIPickerView *)pickerView didSelectRow:(NSInteger)row inComponent:(NSInteger)component
{
  self.pickerTextField.text=[dataArray objectAtIndex:row].cityName;
}


# pragma mark - RNKiwiViewControllerFlowDelegate

- (void)RNKiwiViewControllerDidFinish:(nonnull RNKiwiViewController *)viewController {
  [self.navigationController popViewControllerAnimated:YES];
}

# pragma mark - RNKiwiCurrencyManager

- (NSString *)formattedPrice:(NSNumber *)price withCurrency:(NSString *)currencyCode {
  return [[price stringValue] stringByAppendingString:currencyCode];
}

#pragma mark - RNKiwiTranslationProvider

- (NSString *)localizedStringWithKey:(NSString *)key {
  // In real app it would give us the String based on localization
  return nil;
}

#pragma mark - UIGestureRecognizer

- (BOOL)gestureRecognizer:(UIGestureRecognizer *)gestureRecognizer shouldReceiveTouch:(UITouch *)touch {
  if (self.navigationController.interactivePopGestureRecognizer == gestureRecognizer) {
    return [_activeVc isInteractivePopGestureAllowed];
  }
  return YES;
}

@end
